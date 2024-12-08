import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router';

const columns = [
  { id: 'relatedto', label: 'Related To', minWidth: 170 },
  { id: 'title', label: 'Title', minWidth: 200 },
];

export default function ViewAllArticle() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticle = async () => {
    try {
      const response = await axios.get('http://localhost:8080/article/viewallarticles');
      console.log(response.data)
      if (response.status === 202) {
        setRows(response.data || []);
      } else {
        setError('Failed to fetch data from the server.');
      }
    } catch (err) {
      setError('Error occurred while fetching data.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const navigate=useNavigate()

  const ViewArticle = async (aid) => {
    const response = await axios.get(`http://localhost:8080/article/viewarticlebyid/${aid}`)
    console.log(response.data)
    const handleUpdateDiet = () => {
      navigate("/user/viewarticle", {
        state: { article: response.data }  
      });
    };
  
    handleUpdateDiet(); 
  };

  return (
    <div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        
        .viewall {
          text-align: center;
          margin-top: 30px;
          font-size: 2.5rem;
          color: #4caf50; /* Green color */
          text-transform: uppercase;
          font-family: 'Poppins', sans-serif; /* Updated font-family */
          letter-spacing: 2px;
          border-bottom: 2px solid #4caf50;
          padding-bottom: 10px;
        }
        `}
      </style>
      <h1 className="viewall">View ALL Articles</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '50px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>{error}</div>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={`${row.relatedto}-${row.title}`}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell>
                        <Button variant="contained" color="primary" onClick={() => ViewArticle(row.aid)}>View Article</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  );
}
