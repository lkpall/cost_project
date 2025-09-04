import { useState, useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';

import Filters from "../table/Filters";

export default function TableServices() {
  const columns = ["ID", "Projeto", "Nome", "Custo", "Descrição", "Ações"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ projectName: '', name: '', description: '' });

  function extractServices(data) {
    return data.flatMap(project =>
      project.services.map(service => ({
        ...service,
        projectName: project.name
      }))
    );
  }

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const allServices = extractServices(data);
        console.log(allServices);
        setServices(allServices);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao carregar serviços");
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <Paper sx={{ p: 3, m: '20px auto', maxWidth: 800 }}>Carregando...</Paper>
  }

  if (error) {
    return <Paper sx={{ p: 3, m: '20px auto', maxWidth: 800 }}>{error}</Paper>;
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  const projectNames = [...new Set(services.map(s => s.projectName))];

  const filteredServices = services.filter(service => {
    const matchProject = !filters.projectName || service.projectName === filters.projectName;
    const matchName = !filters.name || service.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchDesc = !filters.description || service.description.toLowerCase().includes(filters.description.toLowerCase());
  return matchProject && matchName && matchDesc;
});

  return (
    <Paper sx={{ p: '3em', m: '20px auto',  maxWidth: '100%' }}>
      <Filters projects={projectNames} onFilter={setFilters} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ListAltIcon sx={{ fontSize: '2em', mr: '0.5em' }} />
        <h3 style={{ margin: 0 }}>Lista de Serviços</h3>
      </div>
      <TableContainer component={Paper} sx={{ border: '2px solid #089733ff', m: '1em auto', mb: 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} sx={{ fontWeight: 'bold' }}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((service) => (
              <TableRow key={service.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.projectName}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>R$ {service.cost}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <Edit sx={{ cursor: 'pointer', marginRight: '0.5em', transition: 'color 0.3s', '&:hover': { color: '#05a11aff' } }} />
                    <DeleteIcon sx={{ cursor: 'pointer', marginRight: '0.5em', transition: 'color 0.3s', '&:hover': { color: '#ff1744' } }} />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
