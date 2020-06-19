import React from 'react';

const BodyContent = (props)=>{
    return (
        <div className="contact-container container d-flex justify-content-center align-items-center">
        <div className="row">
            <div className="col-12">
           <div className="card contact-card">
                  <div className="card-block p-3">
                    <div className="row">
                    <div className="col-md-4 col-sm-4 text-center">
                          <img src="http://getdrawings.com/img/businessman-silhouette-19.jpg" alt="" className="img-thumbnail"/>
                      </div>
                      <div className="col-md-8 col-sm-8">
                          <h3 className="card-title">Name: Brijesh Ahir</h3>
                          <p className="card-text"><strong>Profession: </strong> Web Developer </p>
                          <p className="card-text"><strong>Main Skills: </strong> PHP and React.js</p>
                          <p className="card-text"><strong>Another Skills: </strong> Machine Learning - R Language and Python</p>
                          <p><strong>Platform: </strong>
                              <span className="badge badge-primary p-2 mr-2">WordPress</span> 
                              <span className="badge badge-secondary p-2 mr-2">Laravel</span>
                              <span className="badge badge-danger p-2">Django</span>
                          </p>
                      </div>         
                    </div>
                    </div>
                </div>
          </div>
        </div> 
      </div>
    )
}
export default BodyContent;