import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Filters({ projects, onFilter }) {
  const [localFilters, setLocalFilters] = useState({ projectName: '', name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  }

  const handleFilter = () => {
    onFilter(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { projectName: '', name: '', description: '' };
    setLocalFilters(clearedFilters);
    onFilter(clearedFilters);
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel id="projectName-label">Projeto</InputLabel>
        <Select
          labelId="projectName-label"
          id="projectName"
          name="projectName"
          value={localFilters.projectName || ''}
          label="Projeto"
          onChange={handleChange}
        >
          <MenuItem value="">Todos</MenuItem>
          {projects.map((project) => (
            <MenuItem key={project} value={project}>{project}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Nome do Serviço"
        name="name"
        value={localFilters.name || ''}
        size="small"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        label="Descrição"
        name="description"
        value={localFilters.description || ''}
        size="small"
        variant="outlined"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleFilter} sx={{ backgroundColor: '#089733ff' }}>Buscar</Button>
      <Button variant="outlined" onClick={handleClearFilters}>Limpar</Button>
    </Box>
  );
}
