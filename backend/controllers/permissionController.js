const db = require('../config/database');
const asyncHandler = require('../middlewares/cathAsyncErrorsMiddleware');
const ErrorHandler = require('../utils/errorHandler');

// Create a new permission entry for a user if it does not already exist
exports.createPermission = asyncHandler(async (req, res, next) => {
  const { user_id, ...permissions } = req.body;
  
  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  try {
    // Check if the permission entry already exists
    const [existingPermissions] = await db.promise().query('SELECT * FROM permissions WHERE user_id = ?', [user_id]);

    // Add any new columns to the table dynamically
    const existingColumnsQuery = 'SHOW COLUMNS FROM permissions';
    const [existingColumns] = await db.promise().query(existingColumnsQuery);

    const existingColumnNames = existingColumns.map(col => col.Field);

    for (const [key, value] of Object.entries(permissions)) {
      if (!existingColumnNames.includes(key)) {
        const addColumnQuery = `ALTER TABLE permissions ADD COLUMN ${key} TEXT DEFAULT '[]'`;
        await db.promise().query(addColumnQuery);
      }
    }

    if (existingPermissions.length > 0) {
      // Update the existing permission entry
      const updateColumns = Object.keys(permissions).map(key => `${key} = ?`).join(', ');
      const updateValues = Object.values(permissions).map(value => JSON.stringify(value));
      const updateQuery = `UPDATE permissions SET ${updateColumns} WHERE user_id = ?`;

      await db.promise().query(updateQuery, [...updateValues, user_id]);

      return res.status(200).json({ message: "Permissions updated successfully" });
    } else {
      // Prepare the insert query with dynamic columns
      const columns = ['user_id', ...Object.keys(permissions)];
      const placeholders = columns.map(() => '?').join(', ');
      const insertQuery = `INSERT INTO permissions (${columns.join(', ')}) VALUES (${placeholders})`;

      // Convert permission values to JSON strings
      const values = [user_id, ...Object.values(permissions).map(value => JSON.stringify(value))];
      const [result] = await db.promise().query(insertQuery, values);

      res.status(201).json({ message: 'Permission created successfully', id: result.insertId });
    }
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.updatePermission = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const { entity, permissions } = req.body;
  try {
    const query = `UPDATE permissions SET ${entity} = ? WHERE user_id = ?`;
    await db.promise().query(query, [JSON.stringify(permissions), user_id]);
    res.status(200).json({ message: 'Permissions updated successfully' });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});


exports.getPermissions = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const [permissions] = await db.promise().query('SELECT * FROM permissions WHERE user_id = ?', [user_id]);
    res.json(permissions[0]);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.addEntityColumn = asyncHandler(async (req, res, next) => {
  const { entity } = req.body;

  if (!entity) {
    return res.status(400).json({ message: "Entity name is required" });
  }

  try {
    // Check if the column already exists
    const [existingColumns] = await db.promise().query(
      "SHOW COLUMNS FROM permissions LIKE ?", [entity]
    );

    if (existingColumns.length > 0) {
      return res.status(400).json({ message: `Column ${entity} already exists` });
    }

    // Add the new column with TEXT type
    const query = `ALTER TABLE permissions ADD COLUMN ${entity} TEXT`;
    await db.promise().query(query);

    res.status(200).json({ message: `Entity ${entity} added successfully`, entity: entity});
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

exports.getAllColumns = asyncHandler(async (req, res, next) => {
  try {
    // Query to get all columns from the `permissions` table
    const [columns] = await db.promise().query('SHOW COLUMNS FROM permissions');
    
    // Format the columns data to include only the column names
    const columnNames = columns.map(col => col.Field);
    
    // Remove 'id' and 'user_id' from the column names
    const filteredColumnNames = columnNames.filter(col => col !== 'id' && col !== 'user_id' && col !== 'created_at' && col !== 'updated_at');
    
    
    res.status(200).json({
      message: 'Columns retrieved successfully',
      columns: filteredColumnNames
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});
