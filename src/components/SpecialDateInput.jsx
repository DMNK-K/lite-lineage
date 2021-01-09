import React, { Component } from 'react';
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
        const yearInt = Helpers.clamp(e.target.value, -9999, 9999); //just to limit to 4 digits, users may want fictional dates set in the future
        console.log("year: " + yearInt + " month: " + this.props.date.getMonth() + " day: " + this.props.date.getDate());
        if (Helpers.isDateValid(yearInt, this.props.date.getMonth(), this.props.date.getDate()))
        {
            const newDate = new Date(yearInt, this.props.date.getMonth(), this.props.date.getDate());
            console.log(newDate);
            this.props.handleChangeDate(newDate, "date" + this.props.propertySuffix);
        }
    }
    
    render()
    {
        return (
            <div className="side_drawer_content_section">
                <p className="side_drawer_full_line">Date of {this.props.dateOfStr}:</p>
                <label htmlFor="death_day" className="date_input_label">dd:</label>
                <input value={this.props.date.getDate()} onChange={(e) => this.changeDay(e)} type="number" name="death_day" className="date_input side_drawer_input"/>
                <label htmlFor="death_month" className="date_input_label">mm:</label>
                <input value={this.props.date.getMonth() + 1} onChange={(e) => this.changeMonth(e)} type="number" name="death_month" className="date_input side_drawer_input"/>
                <label htmlFor="death_year" className="date_input_label">yyyy:</label>
                <input value={this.props.date.getFullYear()} onChange={(e) => this.changeYear(e)} type="number" name="death_year" className="date_input side_drawer_input"/>
                <p className="side_drawer_full_line">Displayed date: {this.props.displayedDate}</p>

                <label htmlFor="death_date_imprecise" className="checkbox_input_label">Uncertain of exact year:</label>
                <input checked={this.props.unsurePreciseYear} onChange={(e) => this.props.handleChangeBool(e, "unsurePreciseYearOf" + this.props.propertySuffix)} type="checkbox" name="death_date_imprecise" className="checkbox_input side_drawer_input"/>
                
                <label htmlFor="death_date_full" className="checkbox_input_label">Use full date of {this.props.dateOfStr}:</label>
                <input checked={this.props.useFull} onChange={(e) => this.props.handleChangeBool(e, "useFullDate" + this.props.propertySuffix)} type="checkbox" name="death_date_full" className="checkbox_input side_drawer_input"/>
            </div>
        );
    }
}

export default SpecialDateInput;