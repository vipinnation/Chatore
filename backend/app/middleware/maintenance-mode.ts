

import { Request, Response, NextFunction } from 'express';

const UnderMaintenanceValidator = (req: Request, res: Response, next: NextFunction) => {
    const maintenanceMode = false;

    if (maintenanceMode) {
        return res.render('maintenance');
    }


    next();
};

export default UnderMaintenanceValidator;
