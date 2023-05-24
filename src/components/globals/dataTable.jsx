import DataTable, { defaultThemes } from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';
import { styled } from '@mui/material/styles';

const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

const paginationPerPage = 15;

const customStyles = {
    table: {
        style: {
            border: '.2px solid',
            borderColor: '#adacc797',
            fontFamily: '"Poppins" , sans-serif'
        },
    },
    header: {
        style: {
            minHeight: '58px',
            width: '100px'
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            fontWeight: '700',
            fontSize: '.9rem',
            borderTopColor: defaultThemes.default.divider.default,
        },
    },
    headCells: {
        style: {
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            borderRightColor: defaultThemes.default.divider.default,
            backgroundColor: '#c3c3d673'
        },
    },
    cells: {
        style: {
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            fontSize: '.9rem',
            borderRightColor: defaultThemes.default.divider.default
        },
    },
    noData: {
        style: {
            padding: '1.4rem',
            textAlign: 'center'
        }
    }
};


function Table(props) {
    return (
        <div>
            <DataTable
                selectableRowsComponent={Checkbox}
                selectableRowsComponentProps={selectProps}
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
                paginationPerPage={paginationPerPage}
                noDataComponent="No hay ningún dato disponible"
                pagination
                dense
                striped
                // highlightOnHover
                {...props}
            />
        </div>
    )
}

export default Table
