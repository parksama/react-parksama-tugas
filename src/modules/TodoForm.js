import React, { } from 'react';

const TodoForm = (props) => {
    var input = React.createRef();
    var form_action = event => {
        event.preventDefault();
        if(input.current.value.trim())
        {
            props.onHasil(input.current.value.trim());
            input.current.value = ''
        }
    }
    return (
        <form onSubmit={form_action}>
            <div className="form-group">
                <label className="" htmlFor="judul">Tambah Tugas</label>
                <input
                    type="text" name="judul" id="judul"
                    className="form-control"
                    autoComplete="off"
                    ref={input}
                    required
                    />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
        </form>
    );
}

export default TodoForm;
