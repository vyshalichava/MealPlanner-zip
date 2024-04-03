

function Footer(props){
    const {pageNo,selectRowsPerPage,rowsPerPage,startPage,data,backward,previousPage,nextPage,forward}=props
    
    function onChangeInRows(){
        
        selectRowsPerPage(document.getElementById("sortBy").value)
    }
        return(
        <>
        <div class=" pull-right" style={{position:'static'}} >

<p  class=" pull-left"> Rows Per Page </p>

<p class=" pull-right" style={{ float: 'left', marginLeft: '50px',marginRight:'10px' }} >Page No:{pageNo} 
<a ><i  class="fa fa-angle-double-left" disabled style={{ marginLeft: '30px' ,marginRight:'10px'}} onClick={backward} aria-hidden="true"></i></a>
<a> <i class="fa fa-angle-left" aria-hidden="true"style={{ marginLeft: '10px',marginRight:'10px' }} onClick={previousPage} d></i></a>
<a ><i class="fa fa-angle-right" aria-hidden="true" style={{ marginLeft: '10px',marginRight:'10px' }} onClick={nextPage}></i></a>
<a ><i class="fa fa-angle-double-right" style={{ marginLeft: '10px',marginRight:'10px',disabled:'true'  }} onClick={forward}></i></a>
</p>

<select name="sortByValue" id="sortBy"   style={{ float: 'left', marginLeft: '5px' }} onChange={onChangeInRows} >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        
</select>   
</div>

        </>

    )
}
export default Footer;