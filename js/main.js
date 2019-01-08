/*global m */
import {WMS_PARAMS, WmsWave} from './sound.js'
import WaveInputs from './wave-inputs.js'

let params = WMS_PARAMS[0].slice()

let wave = WmsWave(params)

let playing = false

const App = {
	view() {
		return [
			m(WaveInputs, {
				params,
				onChange: p => {
					params = p.slice()
					wave = WmsWave(params)
				}
			}),
			m('p',
				m('button.play',
					{
						type: 'button',
						onclick: () => {
							if (playing) {
								wave.stop()
								playing = false
							} else {
								wave.play().then(() => {
									playing = false
									m.redraw()
								})
								playing = true
							}
						}
					},
					playing ? 'Stop' : 'Play'
				)
			)
		]
	}
}

m.mount(document.querySelector('.app'), App)
