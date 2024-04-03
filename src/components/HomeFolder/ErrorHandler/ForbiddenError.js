
import './ErrorApp.css'





export default function ForbiddenError(props) {


    return (
        <>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="page-404">
            <div class="outer">
                <div class="middle">
                    <div class="inner">
                   
                        <div class="inner-circle"><i class="fa fa-cogs"></i><span>403</span></div>
                        <span class="inner-status">Opps! your session time out!</span>
                        <span class="inner-detail">Unfortunately you wrer logged out of the app. Please login again        .</span>
                      
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}