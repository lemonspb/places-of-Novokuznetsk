import React, { useState, useContext } from 'react';
import { Form, Button, Popover, Input } from 'antd';
import { AuthContext } from "../Auth/Auth";
import { Link } from 'react-router-dom';



const Editor = ({ onChange, value, submitting, onSubmit }: any) => {

    const { currentUser } = useContext(AuthContext);

    const { TextArea } = Input;
    const [visiblePopup, setVisiblePopup] = useState(false)

    const handleVisibleChange = (visible: boolean) => {
        setVisiblePopup(visible)
    }

    return (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                {!currentUser
                    ? <Popover
                        content={
                            <div>
                                <div>чтобы оставить комментарий о месте нужно <Link to='/signup'>Зарегистрироваться</Link> или</div>
                                <Link to='/login'>Войти</Link>
                            </div>
                        }
                        trigger="click"
                        visible={visiblePopup}
                        onVisibleChange={handleVisibleChange}

                    >
                        <Button htmlType="submit" loading={submitting} type="primary">
                            Добавить комментарий
        </Button>
                    </Popover>
                    : <Button type="primary" htmlType="submit" className="story-form__button" onClick={onSubmit}>
                        Добавить комментарий!
          </Button>}

            </Form.Item>
        </div>
    );
}


  export default Editor; 