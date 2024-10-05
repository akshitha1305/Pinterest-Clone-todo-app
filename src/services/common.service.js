import { resourceModel } from '../config/resource';
import { IS_BOOLEAN } from '../constants';



export const frameEMPNo = async () => {
    try {
        const LastempData = await resourceModel.teacher_Model.find().sort({ created_at: -1 }).limit(1).lean();
        let empNumber = 1;
        if (LastempData && LastempData.length) {
            empNumber = Number(LastempData[0].emp_id) + 1;
        }
        const empNo = empNumber.toString();
        
        if (empNo) {
            return Promise.resolve(empNo);
        } else {
            return Promise.reject(IS_BOOLEAN['FALSE']);
        }
    } catch(error) {
        return Promise.reject(error);
    }
}