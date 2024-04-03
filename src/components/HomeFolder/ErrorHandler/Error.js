
import './ErrorApp.css'





export default function Error(props) {


    return (
        <>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="page-404">
            <div class="outer">
                <div class="middle">
                    <div class="inner">
                   
                        <div class="inner-circle"><i class="fa fa-cogs"></i><span></span></div>
                        <span class="inner-status">Opps! Something went wrong!</span>
                        <span class="inner-detail">Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.</span>
                      
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}