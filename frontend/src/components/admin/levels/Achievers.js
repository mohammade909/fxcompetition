import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLevels} from '../../../actions/user'; 
import TableComponent from './TableComponent'; 

const Achievers= () => {
  const dispatch = useDispatch();
  const { levels, loading, error } = useSelector((state) => state.users);
  const [reload, setReload] = useState(false)
  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch,reload]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Achievers</h1>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && <TableComponent data={levels} reload={()=>setReload(!reload)} />}
    </div>
  );
};

export default Achievers;
