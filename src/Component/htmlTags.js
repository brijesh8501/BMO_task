import React, {Component} from 'react';

class htmlTags extends Component{

    handleChange = (event) => {

        this.props.onChange(event);
    }
    render(){
        let tag = null;
        switch(this.props.tag)
        {
            case('input') :
                tag = (
                    <div className="form-group">
                        <label htmlFor={this.props.tagName} className={this.props.isError ? "text-danger":""}>{this.props.tagLabel}</label>
                        <input 
                            type={this.props.tagType} 
                            className={this.props.isError ? "form-control is-invalid" : "form-control"} 
                            name = {this.props.tagName} 
                            id={this.props.tagId}
                            value={this.props.value}
                            onChange={this.handleChange}
                            aria-label={this.props.tagLabel}
                        />
                        { this.props.isError ? (<span className= "text-danger">{this.props.isError}</span>) : "" }
                    </div>
                );
                break;
            case('dropdown') :
                tag = (
                    <div className="form-group">
                        <label htmlFor={this.props.tagName} className={this.props.isError ? "text-danger":""}>{this.props.tagLabel}</label>
                        <select 
                            className={this.props.isError ? "form-control is-invalid" : "form-control"} 
                            id={this.props.tagId} 
                            name={this.props.tagName}  
                            onChange={this.handleChange}
                            value={this.props.selected}
                        >
                            <option value="" aria-label="select">--select--</option>
                            { this.props.dropDownOption.map( (item, i) =>
                            {
                                return (<option value={item.optionValue} key={i} aria-label={item.optionLabel}>{item.optionLabel}</option>)
                            }) }
                        </select>
                        { this.props.isError ? (<span className= "text-danger">{this.props.isError}</span>) : "" }
                    </div>
                );
                break;
            case('checkbox') :
            tag = (
                <div className="form-group">
                    <label className={this.props.isError ? "text-danger":""} htmlFor={this.props.tagName}>{this.props.tagLabel}</label>
                    <div className={this.props.isError ? "custom-error":""}>
                    <div className="col-sm-9">
                    { this.props.checkboxOption.map( (item, i) =>
                            {
                                return (
                                    <div className="form-check" key={i}>
                                        <input 
                                            className="form-check-input" 
                                            type={this.props.tag} 
                                            id={item.optionId}
                                            name={item.optionName}
                                            checked={item.checked}
                                            onChange={this.handleChange}
                                            data-course={item.optionDataAttr}
                                            aria-label={`${this.props.tagLabel} ${item.optionLabel}`}
                                        />
                                        <label className="form-check-label" htmlFor={item.optionId}>
                                            {item.optionLabel}
                                        </label>
                                    </div>
                                )
                            }) }
                    </div>
                    </div>
                    { this.props.isError ? (<span className= "text-danger">{this.props.isError}</span>) : "" }
                </div>
            );
            break;
            case('textarea') :
            tag = (
                <div className="form-group">
                <label htmlFor={this.props.tagName} className={this.props.isError ? "text-danger":""}>{this.props.tagLabel}</label>
                <textarea 
                    className={this.props.isError ? "form-control is-invalid" : "form-control"}  
                    id={this.props.tagName} 
                    name={this.props.tagName}
                    rows="3"
                    onChange={this.handleChange}
                    value={this.props.value}
                    maxLength="100"
                ></textarea>
                { this.props.isError ? (<span className= "text-danger">{this.props.isError}</span>) : "" }
              </div>
            )
            break;
            default :
                tag = null;
        }
    return tag;
    }
}
export default htmlTags