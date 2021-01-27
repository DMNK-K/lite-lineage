import React, { Component } from 'react';
import Helpers from '../Helpers';

class SpecialDateInput extends Component
{
    constructor(props)
    {
        super(props);
        //this component maintains its own secondary source of truth for some input values
        //to allow the user to type in an invalid date and see that it is in fact invalid, but without commiting this value to the actual primary source
        //i did this, because previously the values were hard-blocked by validation and when the user tried for example to
        //erase the number of day to type a new one, it wouldn't let him, since a "" is not a valid day
        //basically the ux was too restrictive and didn't offer feedback as to what's happening
        this.state = {
            tempYear: this.props.date.getFullYear(),
            tempMonth: this.props.date.getMonth() + 1,
            tempDay: this.props.date.getDate(),
            editingYear: false,
            editingMonth: false,
            editingDay: false
        };
        this.changeDay = this.changeDay.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.startEditingDay = this.startEditingDay.bind(this);
        this.startEditingMonth = this.startEditingMonth.bind(this);
        this.startEditingYear = this.startEditingYear.bind(this);
        this.stopEditingDay = this.stopEditingDay.bind(this);
        this.stopEditingMonth = this.stopEditingMonth.bind(this);
        this.stopEditingYear = this.stopEditingYear.bind(this);
        this.isTempDayValid = this.isTempDayValid.bind(this);
        this.isTempMonthValid = this.isTempMonthValid.bind(this);
        this.isTempYearValid = this.isTempYearValid.bind(this);
        this.getLabelClass = this.getLabelClass.bind(this);
    }

    //the way change methods work is they always set the temp values in local state, without any crucial validation,
    //but they only set the actual value upstream when the data is valid

    changeDay(e)
    {
        this.setState({tempDay: e.target.value});
        if (Helpers.isDateValid(this.props.date.getFullYear(), this.props.date.getMonth(), e.target.value))
        {
            const newDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), e.target.value);
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }

    changeMonth(e)
    {
        this.setState({tempMonth: e.target.value}); //we want temp to be as is, without any 0-based month correction
        const monthInt = e.target.value - 1; //months in Date are 0 based, correction here
        if (Helpers.isDateValid(this.props.date.getFullYear(), monthInt, this.props.date.getDate()))
        {
            const newDate = new Date(this.props.date.getFullYear(), monthInt, this.props.date.getDate());
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }

    changeYear(e)
    {
        const yearInt = Helpers.clamp(e.target.value, -275759 , 275759 ); //just to limit to almost min and max values
        this.setState({tempYear: yearInt});
        // console.log("year: " + yearInt + " month: " + this.props.date.getMonth() + " day: " + this.props.date.getDate());
        if (Helpers.isDateValid(yearInt, this.props.date.getMonth(), this.props.date.getDate()))
        {
            const newDate = new Date(yearInt, this.props.date.getMonth(), this.props.date.getDate());
            // console.log(newDate);
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }

    startEditingDay()
    {
        this.setState({editingDay: true});
    }

    startEditingMonth()
    {
        this.setState({editingMonth: true});
    }
    
    startEditingYear()
    {
        this.setState({editingYear: true});
    }

    //stoping editing has the aditional function of setting temp values back to the actual real values
    //so that when the user starts editing the same thing later, they won't be surprised by what shows up as a temp value
    stopEditingDay()
    {
        this.setState({editingDay: false, tempDay: this.props.date.getDate()});
    }

    stopEditingMonth()
    {
        this.setState({editingMonth: false, tempMonth: this.props.date.getMonth() + 1});
    }
    
    stopEditingYear()
    {
        this.setState({editingYear: false, tempYear: this.props.date.getFullYear()});
    }


    isTempDayValid()
    {
        return Helpers.isDateValid(this.props.date.getFullYear(), this.props.date.getMonth(), parseInt(this.state.tempDay, 10));
    }

    isTempMonthValid()
    {
        return Helpers.isDateValid(this.props.date.getFullYear(), parseInt(this.state.tempMonth - 1, 10), this.props.date.getDate());
    }

    isTempYearValid()
    {
        return Helpers.isDateValid(parseInt(this.state.tempYear, 10), this.props.date.getMonth(), this.props.date.getDate());
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
                </div>

                <div className="side_drawer_row">
                    <label htmlFor={this.props.dateOfStr + "_date_full"} className={this.getLabelClass("checkbox_input_label", this.props.unknownDate)}>Use month and day:</label>
                    <input disabled={this.props.disabled || this.props.unknownDate} checked={this.props.useFull} onChange={(e) => this.props.handleChangeBool(e, "useFullDate" + this.props.propertySuffix)} type="checkbox" name={this.props.dateOfStr + "_date_full"} className="checkbox_input side_drawer_input"/>
                </div>

                <div className="side_drawer_row">
                    <label htmlFor={this.props.dateOfStr + "_day"} className={this.getLabelClass("date_input_label", this.props.unknownDate)}>Day:</label>
                    <input
                        disabled={this.props.disabled || this.props.unknownDate}
                        value={(this.state.editingDay) ? this.state.tempDay : this.props.date.getDate()}
                        onFocus={this.startEditingDay}
                        onBlur={this.stopEditingDay}
                        onChange={(e) => this.changeDay(e)}
                        type="number" name={this.props.dateOfStr + "_day"}
                        className={"date_input side_drawer_input" + ((this.state.editingDay && !this.isTempDayValid()) ? " invalid_input" : "")}
                    />

                    <label htmlFor={this.props.dateOfStr + "_month"} className={this.getLabelClass("date_input_label", this.props.unknownDate)}>Month:</label>
                    <input
                        disabled={this.props.disabled || this.props.unknownDate}
                        value={(this.state.editingMonth) ? this.state.tempMonth : this.props.date.getMonth() + 1} //tempMonth doesnt get 0-based corrected back here, since it stays as is inside the change function 
                        onFocus={this.startEditingMonth}
                        onBlur={this.stopEditingMonth}
                        onChange={(e) => this.changeMonth(e)}
                        type="number" name={this.props.dateOfStr + "_month"}
                        className={"date_input side_drawer_input" + ((this.state.editingMonth && !this.isTempMonthValid()) ? " invalid_input" : "")}
                    />

                    <label htmlFor={this.props.dateOfStr + "_year"} className={this.getLabelClass("date_input_label", this.props.unknownDate)}>Year:</label>
                    <input
                        disabled={this.props.disabled || this.props.unknownDate}
                        value={(this.state.editingYear) ? this.state.tempYear : this.props.date.getFullYear()}
                        onFocus={this.startEditingYear}
                        onBlur={this.stopEditingYear}
                        onChange={(e) => this.changeYear(e)}
                        type="number" name={this.props.dateOfStr + "_year"}
                        className={"date_input side_drawer_input" + ((this.state.editingYear && !this.isTempYearValid()) ? " invalid_input" : "")}
                    />
                    
                </div>
                <p className="side_drawer_row">Displayed date: {(this.props.disabled) ? "none" : this.props.displayedDate}</p>                
            </div>
        );
    }
}

export default SpecialDateInput;