import React from 'react';
import { View } from 'react-native';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

export default class BarChartComponent extends React.PureComponent {

    render() {
        const data = this.props.data
        const viewStyle = this.props.viewStyle
        
        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value.confidence < CUT_OFF ? y(value.confidence) - 10 : y(value.confidence) + 15 }
                    fontSize={ 14 }
                    // fill={ value.confidence >= CUT_OFF ? 'white' : 'black' }
                    fill={ 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value.confidence}
                </Text>
            ))
        )

        return (
            <View
                style={[{ flexDirection: 'column', paddingVertical: 5}, viewStyle] } 
            >
                <BarChart
                    style={{ flex: 1 }}
                    data={data}
                    yAccessor={({item}) => item.confidence}
                    svg={{ fill: '#E0A1E1', }}
                    contentInset={{ top: 15, bottom: 5 }}
                    // spacing={0.2}
                    spacingInner={0.5}
                    spacingOuter={0.5}
                    // bandwidth={5}
                >
                    <Labels/>
                </BarChart>

                <XAxis
                    svg={{
                        fill: '#3673DD',
                        fontSize: 15,
                    }}
                    style={{ marginTop: 10 }}
                    data={ data }
                    yAccessor={({item}) => item.confidence}
                    scale={scale.scaleBand}
                    formatLabel={ (_, index) => data[index].label }
                    labelStyle={ { color: 'red', fontSize: 20} }
                />
                
            </View>
        )
    }

}
