import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {
  DataGrid,
  GridRowModes,
  GridRowEditStopReasons,
  GridActionsCellItem,
  GridToolbarContainer,
  GridCellParams,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import './commandesList.css';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Commands
      </Button>
    </GridToolbarContainer>
  );

}

function Command() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  // product dropdown data
  const [products, setProducts] = React.useState([]);
  // user dropdown data
  const [users, setUsers] = React.useState([]);
  // Other state variables for dropdown data

  const fetchCommands = async () => {
    try {
      const response = await axios.get('http://localhost/api_orders/api/index.php/commandall', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data.data);
      setRows(response.data.data);
    } catch (error) {
      console.error('Error fetching commands:', error);
    }
  };

  React.useEffect(() => {
    fetchCommands();
    fetchUsers();
    fetchProducts();
  }, []);
// fetch all products to display them in the dropdown
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/api_orders/api/index.php/product', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  // fetch all users to display them in the dropdown
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/api_orders/api/index.php/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

      const addCommandAndLigneCommand = async (newCommand) => {
    try {
      // Add new command
      const commandResponse = await axios.post(
        'http://localhost/api_orders/api/index.php/command',
        newCommand,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const id_command = commandResponse.data.id; // Get the newly inserted command's ID

      // Add new ligneCommand
      const newLigneCommand = {
        id: randomId(),
        quantity: newCommand.quantity,
        id_command,
        product_id: newCommand.product_id,
      };

      await axios.post(
        'http://localhost/api_orders/api/index.php/ligneCommand',
        newLigneCommand,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      fetchCommands(); // Refresh the commands list
    } catch (error) {
      console.error('Error adding command and ligneCommand:', error);
    }
  };

  const updateCommandAndLigneCommand = async (updatedCommand) => {
    try {
      // Update command
    const commandResponse = await axios.put(
      `http://localhost/api_orders/api/index.php/command/${updatedCommand.id}`,
      updatedCommand,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
      const id_command = commandResponse.data.id; // Get the updated command's ID

      // Update ligneCommand
      const updatedLigneCommand = {
        id: randomId(),
        quantity: updatedCommand.quantity,
        id_command,
        product_id: updatedCommand.product_id,
      };

      await axios.put(
        `http://localhost/api_orders/api/index.php/ligneCommand/${updatedLigneCommand.id}`,
        updatedLigneCommand,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchCommands(); // Refresh the commands list
    } catch (error) {
      console.error('Error updating command and ligneCommand:', error);
    }
  };

  const deleteCommandAndLigneCommand = async (id) => {
    try {
      // Delete command
   const responseData =   await axios.delete(`http://localhost/api_orders/api/index.php/command/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(responseData);
      const id_command = responseData.data.id; // Get the deleted command's ID

      // Delete ligneCommand
      await axios.delete(
        `http://localhost/api_orders/api/index.php/ligneCommand/${id_command}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchCommands(); // Refresh the commands list
    } catch (error) {
      console.error('Error deleting command and ligneCommand:', error);
    }
  };


      

  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'User ID', width: 150, editable: true },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Product ID',
      width: 150,
      editable: true,
      renderCell: (params) => {
        const id = params.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        console.log('isInEditMode', isInEditMode);
        if (isInEditMode) {
          return (
            <select name="product_id" id="product_id">
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          );
        }
        return <div>{params.value}</div>;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

    setRows(rows.map((row) => (row.id === id ? { ...row, isNew: false } : row)));
  };

  // Implement handleSaveClick, handleDeleteClick, and handleCancelClick
  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    const updatedCommand = rows.find((row) => row.id === id);
    await updateCommandAndLigneCommand(updatedCommand);
  };

  const handleDeleteClick = (id) => async () => {
    await deleteCommandAndLigneCommand(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
 

  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      setRows([...rows, newRow]);
      await addCommandAndLigneCommand(newRow);
    } else {
      setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
      await updateCommandAndLigneCommand(newRow);
    }
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <h1 className="wewe">Command List Page</h1>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          sx={{ color: 'white', '& .MuiDataGrid-cell': { color: 'inherit' } }}
        />
      </Box>
    </div>
  );
}

export default Command;
