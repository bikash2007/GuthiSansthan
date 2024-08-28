import React from 'react'

export default function Lawform() {
  return (
   <>
<div className='container-fluid'>
   <form>
    <label>PDF TITLE</label>
    <input type="text" name="title" placeholder="Enter PDF Title"/>
    <label>PHOTO</label>
    <input  type='file'    />
    <label>PDF LINK</label>
    <input type='text' />
   </form>

</div>

   </>
  )
}
