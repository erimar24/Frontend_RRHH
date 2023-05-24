import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
}

const BreadCrumbs = ({ breadcrumbs }) => {
    const navigate = useNavigate()
    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];

    return (
        <div role="presentation" style={{ marginBottom: "2rem" }}>
            <Breadcrumbs aria-label="breadcrumb">
                {breadcrumbs.map((breadcrumb, index) => (
                    index !== breadcrumbs.length - 1 ? (
                        <Link
                            key={index}
                            underline="hover"
                            color="inherit"
                            onClick={() => navigate(breadcrumb.url)}
                            style={{ cursor: "pointer" }}
                        >
                            {breadcrumb.label}
                        </Link>
                    ) : null
                ))}
                <Typography color="text.primary">
                    {lastBreadcrumb.label}
                </Typography>
            </Breadcrumbs>
        </div>
    );
};

export default BreadCrumbs;