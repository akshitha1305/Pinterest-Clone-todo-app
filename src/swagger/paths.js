
import accontData from './user'
import teacherData from './teacher'
import attendenceData from './attendence'
import admissionData from './admission'
import classData from './class'
import feesstructureData from './feesstructure'
import subjectData from './subject'
import advanceData from './advance'
import student_attendenceData from './student_attendence'
import trans_feesData from './trans_fees'

module.exports = {
    ...accontData,
    ...teacherData,
    ...attendenceData,
    ...admissionData,
    ...classData,
    ...feesstructureData,
    ...subjectData,
    ...advanceData,
    ...student_attendenceData,
    ...trans_feesData
};
