import React from 'react'
import { Checkmark } from 'react-checkmark'
function Success({message}) {
    return (
        <div>
            <div class="mx-auto mt-2 w-[13%] flex items-center  bg-green-100 border-l-4 border-green-500 text-green-700 p-1 rounded-lg">
    <p>{message}</p>
    <p class="ml-2 text-lg font-semibold"><Checkmark size={'small'} /></p>
</div>
        </div>
    )
}

export default Success
