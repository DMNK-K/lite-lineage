//import { createContext } from "react";
import React, {createContext} from 'react';

const TreeContext = React.createContext(
    {
        currentTree: null,
        isInTree: false,
        treeNames:[],

        treeHandlers: {},
        familyHandlers: {},
    }
);

export default TreeContext;