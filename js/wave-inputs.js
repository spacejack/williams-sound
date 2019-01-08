/*global m */
import {WMS_PARAMS, WMS_LABELS, paramSetIndex} from './sound.js'

/*
interface Attrs {
	params: number[]
	onChange(i: number): void
}
*/

/** UI component for wave params */
export default function WaveInputs() {
	return {
		view({attrs: {params, onChange}}) {
			let index = paramSetIndex(params)
			return m('.wave-inputs',
				WMS_LABELS.map((l, i) => m('.wave-input',
					l + ' ',
					m('input', {
						type: 'text',
						value: params[i],
						maxlength: i > 6 ? 5 : 3,
						oninput: e => {
							const value = Number(e.currentTarget.value)
							const p = params.slice()
							p[i] = value
							onChange(p)
						}
					})
				)).concat([
					m('.wave-input',
						m('select',
							{
								value: String(index),
								onchange: e => {
									const i = Number(e.currentTarget.value)
									if (i >= 0) {
										onChange(WMS_PARAMS[i].slice())
									} // else selected custom
								}
							},
							WMS_PARAMS.map((p, i) => m('option',
								{value: String(i)},
								'Preset ' + (i + 1)
							)).concat([
								m('option', {value: -1}, 'Custom')
							])
						)
					)
				])
			)
		}
	}
}
