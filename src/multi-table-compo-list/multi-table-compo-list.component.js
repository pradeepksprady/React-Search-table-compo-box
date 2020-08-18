import React from "react";
import './multi-table-compo-list.css';

class MultiColumnCompoTableList extends React.Component{
  constructor(Props){
    super(Props);
    this.wrapperRef = React.createRef();
    // this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = { data:Props.List , listValue: Props.List, visibility:'show-all' , fieldToShow:['country'] , value:"Switzerland" , inputVal:"Switzerland", showInputkey:"country" , showList:false}
    this.handleChange = this.handleChange.bind(this);
    this.closeList = this.closeList.bind(this);
    this.openList = this.openList.bind(this);
  }
  componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
  }

 handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.showList) {
          this.closeList(event)
        }
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

  closeList(e){
    this.setState(state=>({
      showList : false,
      inputVal: this.state.value
    }))
  }
  openList(e){
    this.setState(state=>({
      showList : true,
      listValue: this.state.data
    }))
  }
  handleChange(e){
    let val = ''+ e.target.value;

    let arrayList = this.state.data.filter(o =>
        Object.keys(o).some(k => 
          o[k].toString().toLowerCase().includes(val.toLowerCase())));
    this.setState(state=>({
      listValue : arrayList && arrayList.length > 0 ? arrayList : [],
      inputVal:val ,
      showList:true
    }))
  }
  render(){
    function ListHeadItems(e) {
      return e.heads.map((item , index)=>
        <th  key={item} > {item} </th>
      )
    }
    function ListBodyByKey(e){
        return e.keyFlag.map((item, index)=>
          <td key={index}>{e.value[item]}</td>
        )
    }
    const getUpdateVal = selected =>{

      let val = selected[this.state.showInputkey];
      this.setState(state=>({
              value: val,
              inputVal: val,
              listValue : this.state.data,
              showList:false
            }))
    }
    const ListBodyItems = e =>{
      return e.data.map((item , index)=>
        <tr key={index} onClick={()=> getUpdateVal(item)}>
          <ListBodyByKey value={item}  keyFlag={e.keys} /> 
        </tr>
      )
    }
    const Table = e=>{
      let thVal = e.visibility === 'show-all' && this.state.listValue && this.state.listValue.length > 0 ? Object.keys(e.data[0]) : e.keyList;
      const tableVal =  this.state.listValue && this.state.listValue.length > 0 ? <table className="compo-table">
        <tr>
          <ListHeadItems heads={thVal} />
        </tr>
        <ListBodyItems keys={thVal} data={this.state.listValue} />
      </table> : <span>No data Found</span>
      return this.state.showList ? tableVal : ''
    }
    const ToggleList = e =>{
      return  <span>
                 {this.state.showList ? <i className="icon-up-open" onClick={this.closeList} ></i> :
                                  <i className="icon-down-open" onClick={this.openList}></i>}
               </span>

    }
    return (
        <div className="container">
          <h4>Multi Column Compo Table List</h4>
          <div className="custom-column-wrap">
             <div className="form-group-icon">
               <label>Multi Select</label>  
               <div className="icon-input">
                 <input type="text" name={this.state.fieldToShow} value={this.state.inputVal} onChange={this.handleChange} />
                 <ToggleList />
               </div>
             </div>
             <div  ref={this.wrapperRef}>
               <Table  visibility={this.state.visibility} keyList={this.state.fieldToShow} data={this.state.listValue} />
             </div>
          </div>

        </div>  
      )
  }
}
export default MultiColumnCompoTableList;
