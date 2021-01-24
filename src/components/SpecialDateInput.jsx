import React, { Component, Fragment } from 'react';
import Helpers from '../Helpers';

class SpecialDateInput extends Component
{
    constructor(props)
    {
        super(props);
        //this.state = {}
        this.changeDay = this.changeDay.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.getLabelClass = this.getLabelClass.bind(this);
    }

    changeDay(e)
    {
        if (Helpers.isDateValid(this.props.date.getFullYear(), this.props.date.getMonth(), e.target.value))
        {
            const newDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), e.target.value);
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }

    changeMonth(e)
    {
        const monthInt = e.target.value - 1;
        if (Helpers.isDateValid(this.props.date.getFullYear(), monthInt, this.props.date.getDate()))
        {
            const newDate = new Date(this.props.date.getFullYear(), monthInt, this.props.date.getDate());
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }

    changeYear(e)
    {
        const yearInt = Helpers.clamp(e.target.value, -999999, 999999); //just to limit to 6 digits, users may want fictional dates set in the future
        console.log("year: " + yearInt + " month: " + this.props.date.getMonth() + " day: " + this.props.date.getDate());
        if (Helpers.isDateValid(yearInt, this.props.date.getMonth(), this.props.date.getDate()))
        {
            const newDate = new Date(yearInt, this.props.date.getMonth(), this.props.date.getDate());
            console.log(newDate);
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }

    getLabelClass(base, additionalDisabledCondition)
    {
        return base + (this.props.disabled || additionalDisabledCondition ? " label_disabled" : "");
    }

    render()
    {
        return (
            <div className="side_drawer_content_section">
                <p className={this.getLabelClass("side_drawer_row")}>
                    Date of {this.props.dateOfStr}:
                </p>
                <div className="side_drawer_row">
                    
                    <label htmlFor={this.props.dateOfStr + "_date_unknown"} className={this.getLabelClass("checkbox_input_label")}>Unknown:</label>
                    <input disabled={this.props.disabled} checked={this.props.unknownDate} onChange={(e) => this.props.handleChangeBool(e, "unknownDateOf" + this.props.propertySuffix)} type="checkbox" name={this.props.dateOfStr + "_date_unknown"} className="checkbox_input side_drawer_input"/>
                </div>

                <div className="side_drawer_row">
                    <label htmlFor={this.props.dateOfStr + "_date_imprecise"} className={this.getLabelClass("checkbox_input_label", this.props.unknownDate)}>Uncertain of exact year:</label>
                    <input disabled={this.props.disabled || this.props.unknownDate} checked={this.props.unsurePreciseYear} onChange={(e) => this.props.handleChangeBool(e, "unsurePreciseYearOf" + this.props.propertySuffix)} type="checkbox" name={this.props.dateOfStr + "_date_imprecise"} className="checkbox_input side_drawer_input"/>
                    
                    <label htmlFor={this.props.dateOfStr + "_date_full"} className={this.getLabelClass("checkbox_input_label", this.props.unknownDate)}>Use month and day:</label>
                    <input disabled={this.props.disabled || this.props.unknownDate} checked={this.props.useFull} onChange={(e) => this.props.handleChangeBool(e, "useFullDate" + this.props.propertySuffix)} type="checkbox" name={this.props.dateOfStr + "_date_full"} className="checkbox_input side_drawer_input"/>
                </div>

                <div className="side_drawer_row">
                    <label htmlFor={this.props.dateOfStr + "_day"} className={this.getLabelClass("date_input_label", this.props.unknownDate)}>Day:</label>
                    <input disabled={this.props.disabled || this.props.unknownDate} value={this.props.date.getDate()} onChange={(e) => this.changeDay(e)} type="number" name={this.props.dateOfStr + "_day"} className="date_input side_drawer_input"/>
                    <label htmlFor={this.props.dateOfStr + "_month"} className={this.getLabelClass("date_input_label", this.props.unknownDate)}>Month:</label>
                    <input disabled={this.props.disabled || this.props.unknownDate} value={this.props.date.getMonth() + 1} onChange={(e) => this.changeMonth(e)} type="number" name={this.props.dateOfStr + "_month"} className="date_input side_drawer_input"/>
                    <label htmlFor={this.props.dateOfStr + "_year"} className={this.getLabelClass("date_input_label", this.props.unknownDate)}>Year:</label>
                    <input disabled={this.props.disabled || this.props.unknownDate} value={this.props.date.getFullYear()} onChange={(e) => this.changeYear(e)} type="number" name={this.props.dateOfStr + "_year"} className="date_input side_drawer_input"/>
                </div>
                <p className="side_drawer_row">Displayed date: {(this.props.disabled) ? "none" : this.props.displayedDate}</p>                
            </div>
        );
    }
}

export default SpecialDateInput;