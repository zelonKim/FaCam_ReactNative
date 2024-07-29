import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Typography } from './Typography';


// export const Badge = (props) => {
//         return(
//             <View>
//                 <View>
//                     {props.children}
//                     <View
//                         style={[{
//                             width: 16,
//                             height:16,
//                             borderRadius: 8,
//                             backgroundColor: 'red',
//                             alignItems: 'center',
//                             justifyContent: 'center'
//                         }, {
//                             position: 'absolute',
//                             right: -5,
//                             top: -5,
//                         }]}
//                     >
//                         <Typography fontSize={10} color='white'> N </Typography>
//                     </View>
//                 </View>
//             </View>
//         )
//     }


export const Badge: React.FC<{
    children: ReactElement,
    count?: number
}> = (props) => {
    return(
        <View>
            <View>
                {props.children}
                <View
                    style={[{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }, {
                        position: 'absolute',
                        right: -5,
                        top: -5,
                    }]}>
                        {props.count && (
                            <Typography fontSize={10} color='white'> 
                                {props.count.toString()}
                            </Typography>
                        )}
                </View>
            </View>
        </View>
    )
}
