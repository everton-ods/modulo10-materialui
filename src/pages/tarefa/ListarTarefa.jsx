import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Desenvolvimento de App', 'Desenvolver a aplicação para gerenciamento de tarefas.', '2023-12-01', '2023-12-10', 'Concluída', 'Recurso 1'),
  createData(2, 'Revisão de Código', 'Revisar o código do backend.', '2023-12-02', '2023-12-05', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Testes de Integração', 'Realizar testes de integração com a API.', '2023-12-03', '2023-12-07', 'Aguardando', 'Recurso 3'),
  createData(4, 'Documentação', 'Escrever documentação do projeto.', '2023-12-05', '2023-12-08', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Treinamento da Equipe', 'Realizar treinamento para os desenvolvedores.', '2023-12-06', '2023-12-09', 'Em Andamento', 'Recurso 5'),
];


//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };

    return(
    <>
    <Card sx={{ borderRadius: 2, boxShadow: 3, marginTop: 2 }}>
        <CardHeader
          title="App brasil escola"
          subheader="Listagem de Tarefas"
          sx={{ backgroundColor: '#f0f0f0' }}
        />
        <CardContent>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, marginTop: 2 }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Título</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">Descrição</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">Data de Início</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">Data de Finalização</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }} align="right">Recurso</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row) => (
                  <TableRow key={row.idTarefa} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell>{row.idTarefa}</TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)} sx={{ marginRight: 1 }}>
                        <EditIcon fontSize="small" />
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          </CardContent>
  <CardActions sx={{ justifyContent: 'space-between', backgroundColor: '#fafafa' }}>
    <Button
      size="small"
      variant="contained"
      onClick={handleOpen}
      sx={{
        backgroundColor: '#4caf50', 
        '&:hover': { backgroundColor: '#388e3c' }
      }}
    >
      Criar Tarefa
    </Button>
    <Button
      size="small"
      variant="outlined"
      sx={{ borderColor: '#1976d2', color: '#1976d2', '&:hover': { borderColor: '#1565c0' } }}
    >
      Cancelar
    </Button>
  </CardActions>
</Card>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarTarefa;