import AutocompleteModel from "./AutocompleteModel";

export const SearchMedicationMapper = (data) => {
    var options = [];
    for (let index = 0; index < data.length; index++) {
        var option = new AutocompleteModel(
            data[index].name,
            "",
            data[index],
            false
        );
        options.push(option);
    }
    return options;
};