import React,{useContext} from "react";
import { withRouter,Redirect } from "react-router";
import firebases from "../../services/base"
import { Button, Form,Input,Icon,Upload } from 'antd';
import { AuthContext } from "../Auth/Auth";

import './ RegistrationPage.scss'


const EditAccountPage = (props,{ history }) => {

  const { currentUser } = useContext(AuthContext);


    const handleEditProfile = (event) =>{
        event.preventDefault();
        props.form.validateFields((err, values) => {
          if (!err) {
         
          var blob = new Blob([values.upload.file], { type: "image/jpeg" });
          const avatarStgRef =  firebases.storage().ref("Usuarios/" + currentUser.uid + `/${values.upload.file.name}`).put(blob);
          avatarStgRef.then((snapshot)=>{
            snapshot.ref.getDownloadURL().then((url)=>{ 
                currentUser.updateProfile({
                    photoURL: url       
                }).then(()=>{
                  firebases.database().ref("Usuarios/" + currentUser.uid).set({
                    "photoUri": url   
                  });
              });
            });
        });
                    firebases.auth().onAuthStateChanged((user) => {
                        if (user) { 
                          user.updateProfile({
                            displayName: values.name
                          })
                        }
         
                        }); 

                        

                      } 
                      return <Redirect to="/" />
                      })


      
    }

  
    

  return (
      <Form onSubmit={handleEditProfile} className='form-register' >
     <Form.Item label="Upload" >
          {props.form.getFieldDecorator('upload', {
          })(
            <Upload name="logo" listType="picture" multiple={true}>
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
          )}
        </Form.Item>
      <Form.Item>
      {props.form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input  type="text"
            placeholder="name" />,
            )}
      </Form.Item>
      <Button type='primary'  htmlType="submit" >сохранить</Button>
    </Form>
  );
};

const WrappedEditAccountPage = Form.create({ name: 'normal_login' })(withRouter(EditAccountPage));
export default WrappedEditAccountPage;