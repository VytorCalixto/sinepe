const libs = `${process.cwd()}/libs`;
const gender = require(`${libs}/convert/gender`);
const period = require(`${libs}/convert/period`);
const schoolYear = require(`${libs}/convert/schoolYear`);
const admDependency = require(`${libs}/convert/admDependency`);
const admDependencyPriv = require(`${libs}/convert/admDependencyPriv`);
const location = require(`${libs}/convert/location`);
const ruralLocation = require(`${libs}/convert/ruralLocation`);
const ethnicGroup = require(`${libs}/convert/ethnicGroup`);
const agreement = require(`${libs}/convert/agreement`);
const booleanVariable = require(`${libs}/convert/booleanVariable`);
const educationLevel = require(`${libs}/convert/educationLevel`);
const educationLevelMod = require(`${libs}/convert/educationLevelMod`);
const educationLevelShort = require(`${libs}/convert/educationLevelShort`);
const educationType = require(`${libs}/convert/educationType`);
const citySize = require(`${libs}/convert/citySize`);
const incomeLevel = require(`${libs}/convert/incomeLevel`);
const idhmLevel = require(`${libs}/convert/idhmLevel`);
const stateName = require(`${libs}/convert/stateName`);

const ids = {
    gender_id: gender,
    period_id: period,
    school_year_id: schoolYear,
    education_level_id: educationLevel,
    education_level_mod_id: educationLevelMod,
    education_level_short_id: educationLevelShort,
    adm_dependency_id: admDependency,
    adm_dependency_detailed_id: admDependencyPriv,
    location_id: location,
    rural_location_id: ruralLocation,
    ethnic_group_id: ethnicGroup,
    agreement_id: agreement,
    integral_time_id: booleanVariable,
    government_agreement_id: booleanVariable,
    education_day_care_child_id: booleanVariable,
    education_preschool_child_id: booleanVariable,
    education_begin_elementary_school_id: booleanVariable,
    education_end_elementary_school_id: booleanVariable,
    education_middle_school_id: booleanVariable,
    education_professional_id: booleanVariable,
    education_eja_id: booleanVariable,
    education_type_id: educationType,
    income_level_id: incomeLevel,
    city_size_id: citySize,
    idhm_level_id: idhmLevel,
    state_id: stateName
};

function transform(removeId=false) {
    return (req, res, next) => {
        // Para cada objeto do resultado
        req.result.forEach((obj) => {
            Object.keys(obj).forEach((key) => {
                // Se não há uma função especificada, retorna
                if(typeof ids[key] === 'undefined') return;
                let id = obj[key];
                obj[key.replace('_id', '_name')] = ids[key](id);
                if(removeId) delete obj[key];
            });
        });
        next();
    };
}

module.exports = {
    transform,
    gender,
    period,
    schoolYear,
    admDependency,
    location,
    ethnicGroup,
    agreement,
    booleanVariable,
    educationLevel,
    educationLevelMod,
    educationType
};
