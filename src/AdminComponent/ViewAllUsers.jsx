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
  { id: 'uid', label: 'UID', minWidth: 100 },
  { id: 'fullname', label: 'Full Name', minWidth: 170 },
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'password', label: 'Password', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 100, align: 'right' },
  { id: 'email', label: 'Email', minWidth: 200 },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/viewallusers');
        if (response.status === 200) {
          setRows(response.data);
          console.log(response.data);
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

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = async (uid) => {
    try {
      const response = await axios.post(`http://localhost:8080/user/deleteuser/${uid}`);
      if (response.status === 202) {
        setRows(rows.filter((row) => row.uid !== uid));
        alert(`User ${uid} has been successfully deleted.`);
      } else {
        alert('Failed to delete the user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  const viewdiet = (rowid) => {
    navigate('/admin/viewuserdiet', {
      state: { rowid: rowid },
    });
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

        .actions-cell div {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px; /* Space between buttons */
        }

        button.MuiButton-containedPrimary {
          background-color: #007bff; /* Custom primary color */
          font-weight: bold;
        }

        button.MuiButton-containedSecondary {
          background-color: #dc3545; /* Custom secondary color */
          font-weight: bold;
        }
        `}
      </style>
      <h1 className="viewall">View All Users</h1>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          marginTop: '50px',
        }}
      >
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
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.uid}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                        <TableCell className="actions-cell">
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => viewdiet(row.uid)}
                            >
                              View Diet
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => deleteUser(row.uid)}
                            >
                              Delete User
                            </Button>
                          </div>
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
