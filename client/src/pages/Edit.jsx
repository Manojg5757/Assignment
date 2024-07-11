import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
import app from '../../firebase'

const Edit = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const[file,setFile] = useState(undefined)
    const[filePerc,setFilePerc] = useState(0)
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        mobile:"",
        designation:"",
        gender:"",
        course:[],
        image:""
    })
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axios.get('/server/employee/edit/'+id)
                console.log(res.data)
                setFormData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[id])
    useEffect(()=>{
        if(file){
            handleFileUpload(file)
        }
    },[file])

    const handleFileUpload = ()=>{
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage,fileName)
        const uploadtask = uploadBytesResumable(storageRef,file)

        uploadtask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100
                setFilePerc(Math.round(progress))
            },
            (error)=>{
               setFileUploadError(error)
            },
            ()=>{
                getDownloadURL(uploadtask.snapshot.ref).then((downloadURL)=>{
                    setFormData({
                        ...formData,
                        image:downloadURL
                    })
                })
            }
        )
    }

    console.log(filePerc)

    const handleChange = (e)=>{
     
        const { name, value, type, checked, files } = e.target;
       
       if (type === 'checkbox') {
           // Handle checkboxes for courses
           if (checked) {
               setFormData({
                   ...formData,
                   course: [...formData.course, value]
               });
           } else {
               setFormData({
                   ...formData,
                   course: formData.course.filter(course => course !== value)
               });
           }
       } else if (type === 'file') {
           // Handle file input for image
           setFormData({
               ...formData,
               [name]: files[0] // Assuming single file upload, adjust as needed
           });
       } else {
           // Handle other input fields
           setFormData({
               ...formData,
               [name]: value
           });
       }
       
       
         
  
   }

   const handleSubmit = async(e)=>{
    e.preventDefault()
        try {
            const res = await axios.put('/server/employee/update/'+id,formData)
            console.log(res.data)
         navigate('/admin-panel')
        } catch (error) {
            console.log(error)
        }
   }

    console.log(formData)
  return (
    <div className='max-w-6xl mx-auto'>
        <h1 className='text-xl text-center py-5'>Edit Employee Details</h1>
        <form onSubmit={handleSubmit}  className='flex flex-col gap-4 max-w-xl mx-auto' >
            <input type="text" name='name' value={formData.name} onChange={handleChange} className='p-3 rounded-lg outline-none' placeholder='Name...' />
            <input type="email" name='email' value={formData.email} onChange={handleChange} className='p-3 rounded-lg outline-none' placeholder='Email...' />
            <input type="tel" name='mobile' value={formData.mobile} onChange={handleChange} className='p-3 rounded-lg outline-none' placeholder='Mobile...' />
            <select name="designation" onChange={handleChange} value={formData.designation} className='p-3 rounded-lg'>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="analyst">Analyst</option>
            </select>
            <div className='flex gap-4'>
                <label className='flex gap-2'>
                <input onChange={handleChange} checked={formData.gender ==='Female'} type="radio" name='gender' value='Female' />
                Female
                </label>
                <label className='flex gap-2'>
                <input onChange={handleChange} checked={formData.gender ==='Male'} type="radio" name='gender' value='Male' />
                Male
                </label>
            </div>
            <div className='flex gap-4'>
                <label className='flex gap-2 text-sm'>
                    <input value='MCA' name='course' checked={formData.course.includes('MCA')} onChange={handleChange} type="checkbox" />
                    MCA
                </label>
                <label className='flex gap-2 text-sm'>
                    <input value='BCA' name='course' checked={formData.course.includes('BCA')} onChange={handleChange} type="checkbox" />
                    BCA
                </label>
                <label className='flex gap-2 text-sm'>
                    <input value='B.E' name='course' checked={formData.course.includes('B.E')} onChange={handleChange} type="checkbox" />
                    B.E
                </label>
                <label className='flex gap-2 text-sm'>
                    <input value='BSC' name='course' checked={formData.course.includes('BSC')} onChange={handleChange} type="checkbox" />
                    BSC
                </label>
            </div>
            <div>
                <input type="file" accept='.jpg,.png' onChange={(e)=>setFile(e.target.files[0])} />
            </div>
            <button type='submit' className='bg-slate-700 p-3 rounded-lg text-white'>Edit Employee</button>
        </form>
    </div>
  )
}

export default Edit