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
import './category.module.css';

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
        Add Categories
      </Button>
    </GridToolbarContainer>
  );
}

function Category() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost/api_orders/api/index.php/category', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setRows(response.data.data);
    console.log(response.data.data);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (newCategory) => {
    const response = await axios.post(
      'http://localhost/api_orders/api/index.php/category',
      newCategory,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response.data);
    fetchCategories();
  };

  const updateCategory = async (updatedCategory) => {
    const response = await axios.put(
      `http://localhost/api_orders/api/index.php/category/${updatedCategory.id}`,
      updatedCategory,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response.data);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    const response = await axios.delete(
      `http://localhost/api_orders/api/index.php/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response.data);
    fetchCategories();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Category Name', width: 300, editable: true },
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

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

    setRows(rows.map((row) => (row.id === id ? { ...row, isNew: false } : row)));
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    const updatedCategory = rows.find((row) => row.id === id);
    await updateCategory(updatedCategory);
  };

  const handleDeleteClick = (id) => async () => {
    await deleteCategory(id);
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
      setRows([...rows, newRow]);
      await addCategory(newRow);
    } else {
      setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
      await updateCategory(newRow);
    }
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <h1 className="wewe">Category List Page</h1>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'white',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
         sx={{ color: 'white', '& .MuiDataGrid-cell': { color: 'inherit' } }}
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
  );
}

export default Category;
