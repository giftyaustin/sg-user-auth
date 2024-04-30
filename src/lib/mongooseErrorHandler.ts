import { Response } from "express";

export const handleDuplicateEntry = (err:any, res:Response) => {
    const duplicateKeys = Object.keys(err.keyValue);
    return res.status(409).json({
      status: false,
      error: duplicateKeys[0] + " already exist(s)",
    });
  };
  
  export const handleValidationError = (err:any, res:Response) => {
    let returnObject:{[key:string]:string} = {};
    const keyNames = Object.keys(err.errors);
    keyNames.map((keyName) => {
      returnObject[keyName] = err.errors[keyName].message;
    });
    return res.status(403).json({ status: false, errors: returnObject });
  };