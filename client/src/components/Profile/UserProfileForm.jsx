// import UserProfile from "../../store/UserProfile"



// function UserProfiles() {
//   const { 
//      ProfileData,
//     ProfileFormData: v,
//     ProfileFormOnChnage,         // using your exact name
//     ReadProfileRequest,
//     CreateProfileRequest,
//     UpdateProfileRequest

//   }=UserProfile();
  
//   return (
//     <div className="container mt-5">
//  <div className="card p-5 rounded-3">
//  <h6>Customer Details</h6>
//  <hr />
//  <div className="row mb-4">
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer Name </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer Phone </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer Fax </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer Country </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer City </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer State </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer Post Code </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Customer Address</label>
// <input type="text" className="form-control " />
//  </div>
//  </div>
//  <h6>Shipping Details</h6>
//  <hr />
//  <div className="row">
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping Name </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping Phone </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping Country </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping City </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping State </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping Post Code </label>
//  <input type="text" className="form-control " />
//  </div>
//  <div className="col-md-3 p-2">
//  <label className="form-label">Shipping Address</label>
//  <input type="text" className="form-control " />
//  </div>
//  </div>
//  <div className="row mt-4">
//  <div className="col-md-3 p-2">
//  <button className="btn btn-success">Save</button>
//  </div>
//  </div>
//  </div>
//  </div>
//   )
// }

// export default UserProfiles


import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import UserStore from '../../store/UserStore.js';
import UserProfile from '../../store/UserProfile.js'; // your zustand store (unchanged)

function Row({ label, value }) {
  return (
    <div className="mb-2">
      <small className="text-muted d-block">{label}</small>
      <div className="fw-semibold">{value || '-'}</div>
    </div>
  );
}

export default function UserProfiles() {
  const navigate = useNavigate();

  // Login check
  const { isLogin } = UserStore();

  // Profile store (UNCHANGED API)
  const {
    isFormSubmit,
    ProfileData,
    ProfileFormData: v,
    ProfileFormOnChange,
    ReadProfileRequest,
    CreateProfileRequest,
    UpdateProfileRequest
  } = UserProfile();

  const [editMode, setEditMode] = useState(false);

  // 1) Fast check: if not logged in -> redirect to /login
  useEffect(() => {
    if (!isLogin()) {
      toast.error('Please login first');
      navigate('/login', { replace: true });
      return;
    }
    // logged in → fetch profile
    ReadProfileRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Normalize ProfileData (your API sometimes returns an array)
  const data = useMemo(() => {
    if (!ProfileData) return null;
    return Array.isArray(ProfileData) ? (ProfileData[0] || null) : ProfileData;
  }, [ProfileData]);
  console.log('ProfileData:', ProfileData, 'Normalized:', data);

  // Helper to prefill form from payload
  const prefillForm = (payload) => {
    if (!payload) return;
    const keys = [
      'cus_add','cus_city','cus_state','cus_country','cus_fax','cus_phone','cus_postcode','cus_name',
      'ship_add','ship_city','ship_state','ship_country','ship_phone','ship_postcode','ship_name'
    ];
    keys.forEach(k => ProfileFormOnChange(k, payload[k] ?? ''));
  };

  // If user clicks Edit/Create, prepare the form
  const onClickEdit = () => {
    setEditMode(true);
    if (data) prefillForm(data);
  };

  const onCancel = () => {
    setEditMode(false);
  };

  const ch = (name) => (e) => ProfileFormOnChange(name, e.target.value);

  const onSave = async () => {
    // minimal guard
    if (!v.cus_name?.trim()) return toast.error('Customer Name is required');
    if (!v.cus_phone?.trim()) return toast.error('Customer Phone is required');
    if (!v.cus_add?.trim()) return toast.error('Customer Address is required');

    const ok = data ? await UpdateProfileRequest() : await CreateProfileRequest();
    if (ok) {
      toast.success(data ? 'Profile updated' : 'Profile created');
      setEditMode(false);
      await ReadProfileRequest();
    } else {
      toast.error('Failed to save profile');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* Left: Summary */}
        <div className="col-md-6">
          <div className="card p-4 rounded-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Profile Summary</h5>
              {!editMode && (
                <button className="btn btn-sm btn-outline-success" onClick={onClickEdit}>
                  {data ? 'Edit Profile' : 'Create Profile'}
                </button>
              )}
            </div>
            <hr />
            <h6 className="text-uppercase text-muted">Customer</h6>
            <Row label="Name" value={data?.cus_name} />
            <Row label="Phone" value={data?.cus_phone} />
            <Row label="Fax" value={data?.cus_fax} />
            <Row label="Country" value={data?.cus_country} />
            <Row label="City" value={data?.cus_city} />
            <Row label="State" value={data?.cus_state} />
            <Row label="Post Code" value={data?.cus_postcode} />
            <Row label="Address" value={data?.cus_add} />

            <h6 className="text-uppercase text-muted mt-3">Shipping</h6>
            <Row label="Name" value={data?.ship_name} />
            <Row label="Phone" value={data?.ship_phone} />
            <Row label="Country" value={data?.ship_country} />
            <Row label="City" value={data?.ship_city} />
            <Row label="State" value={data?.ship_state} />
            <Row label="Post Code" value={data?.ship_postcode} />
            <Row label="Address" value={data?.ship_add} />
          </div>
        </div>

        {/* Right: Edit/Create */}
        <div className="col-md-6">
          <div className="card p-4 rounded-3 h-100">
            <h5 className="mb-0">{editMode ? (data ? 'Update Profile' : 'Create Profile') : 'Profile Actions'}</h5>
            <hr />

            {!editMode ? (
              <div className="text-muted">
                Click <b>{data ? 'Edit Profile' : 'Create Profile'}</b> to {data ? 'update your info' : 'fill your profile'}.
              </div>
            ) : (
              <>
                <h6>Customer Details</h6>
                <div className="row">
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer Name</label>
                    <input className="form-control" value={v.cus_name} onChange={ch('cus_name')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer Phone</label>
                    <input className="form-control" value={v.cus_phone} onChange={ch('cus_phone')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer Fax</label>
                    <input className="form-control" value={v.cus_fax} onChange={ch('cus_fax')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer Country</label>
                    <input className="form-control" value={v.cus_country} onChange={ch('cus_country')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer City</label>
                    <input className="form-control" value={v.cus_city} onChange={ch('cus_city')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer State</label>
                    <input className="form-control" value={v.cus_state} onChange={ch('cus_state')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer Post Code</label>
                    <input className="form-control" value={v.cus_postcode} onChange={ch('cus_postcode')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Customer Address</label>
                    <input className="form-control" value={v.cus_add} onChange={ch('cus_add')} />
                  </div>
                </div>

                <h6 className="mt-3">Shipping Details</h6>
                <div className="row">
                  <div className="col-md-6 p-2">
                    <label className="form-label">Shipping Name</label>
                    <input className="form-control" value={v.ship_name} onChange={ch('ship_name')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Shipping Phone</label>
                    <input className="form-control" value={v.ship_phone} onChange={ch('ship_phone')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Shipping Country</label>
                    <input className="form-control" value={v.ship_country} onChange={ch('ship_country')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Shipping City</label>
                    <input className="form-control" value={v.ship_city} onChange={ch('ship_city')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Shipping State</label>
                    <input className="form-control" value={v.ship_state} onChange={ch('ship_state')} />
                  </div>
                  <div className="col-md-6 p-2">
                    <label className="form-label">Shipping Post Code</label>
                    <input className="form-control" value={v.ship_postcode} onChange={ch('ship_postcode')} />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Shipping Address</label>
                    <input className="form-control" value={v.ship_add} onChange={ch('ship_add')} />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-success" disabled={isFormSubmit} onClick={onSave}>
                    {isFormSubmit ? 'Saving...' : (data ? 'Update' : 'Save')}
                  </button>
                  <button className="btn btn-outline-secondary" disabled={isFormSubmit} onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

