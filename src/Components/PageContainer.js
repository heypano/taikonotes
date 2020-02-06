import React from 'react';

/**
 * React class to contain a page
 */
const PageContainer = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    )
};

export default PageContainer;