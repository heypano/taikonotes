import React from 'react';

/**
 * React class to contain a page
 */
const PageContainer = ({children}) => {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    )
};

export default PageContainer;