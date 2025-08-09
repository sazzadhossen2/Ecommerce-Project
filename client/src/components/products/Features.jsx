import React from 'react'

import FeatureStore from '../../store/FeatureStore';

function Features() {

  const {FeatureList} = FeatureStore();
  return (
    <div className="container section">
 <div className="row">
 <div className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
 <div className="card shadow-sm">
 <div className="card-body">
{
  FeatureList?.map((feature)=>(
     <div key={feature?._id} className="row">
 <div className="col-3">
 <img className="w-100" src={feature.img} />
 </div>
 <div className="col-9">
 <h3 className="bodyXLarge">{feature.name}</h3>
 <span className="bodySmal">{feature.description}</span>
 </div>
 </div>
  ))
}
 </div>
 </div>
 </div>
 </div>
 </div>
  )
}

export default Features