import React from 'react';
import OutsideAlerter from '../outside-alerter/outside-alerter';

const CustomDropdown = ({ data, open, setOpen }) => {
    return (
        <React.Fragment>
            <OutsideAlerter onClose={() => setOpen(false)}>
                <div className='dropdown'>
                    <div className='selector' onClick={() => setOpen(!open)}>Select Value</div>
                    {open && <div className='option-box'>
                        {data.map(k => <div onClick={() => setOpen(false)} className='single-option' id={k.value}>{k.label}</div>)}
                    </div>}
                </div>
                <style jsx>{`
                    .dropdown {
                        position: relative;
                    }
                    .selector {
                        width: 150px;
                        border: 1px solid gray;
                        border-radius: 4px;
                        padding: 5px 10px;
                    }
                    .option-box {
                        width: 150px;
                        border: 1px solid gray;
                        border-radius: 4px;
                        max-height: 210px;
                        overflow-y: auto;
                    }
                    .single-option {
                        font-size: 14px;
                        padding: 5px 10px;
                    }
                `}</style>
            </OutsideAlerter>

        </React.Fragment>

    )
}

export default CustomDropdown;