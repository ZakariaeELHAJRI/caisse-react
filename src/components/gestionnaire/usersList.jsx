import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import axios from "axios";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import './usersList.css'
const initialRows = [
  { id: 1, username: 'Snow KATE', email : 'test@gmail.com', telephone: '+212 623933751', role: 'Admin', password: 'p@ass' },
  { id: 2, username: 'Stark JOHN', email : 'test@gmail.com', telephone: '+123 4567890', role: 'User', password: 'secure123' },
  { id: 3, username: 'Lannister EMMA', email : 'test@gmail.com', telephone: '+987 6543210', role: 'User', password: 'lionheart' },
  { id: 4, username: 'Targaryen ALEX', email : 'test@gmail.com', telephone: '+345 6789012', role: 'Admin', password: 'fireandblood' },
];
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Ajouter Des Utilisateurs
      </Button>
    </GridToolbarContainer>
  );
}
function UsersList() {
  // list users
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
// function fetch users from api usign axios , user should be logged in to access this api using jwt token
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost/api_orders/api/index.php/user/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    setRows(response.data.data);
    console.log(response.data.data);
  };
  React.useEffect(() => {;
    fetchUsers();
  }, []);

  // function to add new user to database using axios post request with jwt token
  const addUser = async (newUser) => {
    const response = await axios.post(
      "http://localhost/api_orders/api/index.php/user/",
      newUser,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    fetchUsers();
  };
  // function to update user using axios put request with jwt token and user id
  const updateUser = async (updatedUser) => {
    const response = await axios.put( `http://localhost/api_orders/api/index.php/user/${updatedUser.id}`, updatedUser,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    fetchUsers();
  };

  // function to delete user using axios delete request with jwt token
  const deleteUser = async (id) => {
    const response = await axios.delete(
      `http://localhost/api_orders/api/index.php/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    fetchUsers();
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

    // Set isNew to false for the edited user
  setRows(rows.map((row) => (row.id === id ? { ...row, isNew: false } : row)));
  };

const handleSaveClick = (id) => async () => {
  setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  const updatedUser = rows.find((row) => row.id === id);
  await updateUser(updatedUser);
};
const handleDeleteClick = (id) => async () => {
  await deleteUser(id);
};

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      // Add a new user
      setRows([...rows, newRow]);
      await addUser(newRow);
    } else {
      // Update an existing user
      setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
      await updateUser(newRow);
    }
    return newRow;
  };
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
   
    { field: 'username', headerName: 'Full Name', width: 300  ,
    editable: true},
  
    { field: 'email', headerName: 'email', type : 'email' , width: 300  ,editable: true },

    { field: 'telephone', headerName: 'Phone Number',type:"number", width: 300  ,
    editable: true},

    {
      field: 'role',
      headerName: 'role',
      type: 'text',
      width: 300, 
      editable: true
    },
    {
      field: 'password',
      headerName: 'password',
      type: 'text',
      width: 300,
      editable: true
    },
  
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
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
return (
  <div style={{ height:'100%', width: '100%' ,}}>
  <h1 className='wewe'>Page de List des Produits</h1> 
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
      sx={{ color: 'white ! important' }}
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
      />
    </Box>
</div>
)
}
export default UsersList






