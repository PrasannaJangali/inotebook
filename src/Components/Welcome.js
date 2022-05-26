import React from 'react'

function Welcome() {
  const a = {
    position: 'sticky',
    top: '0px',
    left: '0px',
    marginTop: '200px',
    textAlign: 'center',
    backgroundColor: '#c8c8c8'
  }
  return (
    <>
      <div>
        <div className="container" >
          <h1 style={{ height: '100px' }}>iNotebook - One place for all your notes</h1>
        </div>
        <h3>Now , Forget about Forgeting your notes and say NO! to your note diaries because we have solution.</h3>
        <div className="d-flex justify-content-around" style={{ marginTop: '90px' }}>
          <div className="">
            <img src="https://www.speakinginbytes.com/wp-content/uploads/2016/12/person-taking-notes.png" className="img-fluid" style={{ height: '200px' }} alt="Responsive image" />
          </div>
          <div className="">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Paper-notes.svg/768px-Paper-notes.svg.png" style={{ height: '200px' }} className="img-fluid" alt="Responsive image" />
          </div>
          <div className="">
            <img src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2020/09/003_galaxytabs7_lifestyle_image.jpg" style={{ height: '200px' }} className="img-fluid" alt="Responsive image" />
          </div>
        </div>
      </div>
      <div style={a}>
        <footer className="footer mt-auto py-3">
          <div  >
            <span className="text-muted">Copyright &copy; 2022-25. All Rights Reserved</span>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Welcome