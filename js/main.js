/*global m */
import {WMS_PARAMS, WmsWave} from './sound.js'
import WaveInputs from './wave-inputs.js'

let params = WMS_PARAMS[0].slice()

let wave = WmsWave(params)

let playing = false

const App = {
	view() {
		return m('.app',
			m('h1', 'Robotron: 2084 Sound Wave Generator'),
			m('p', "This is a re-implementation of ",
				m('a', {href: 'https://en.wikipedia.org/wiki/Robotron:_2084'}, "Robotron: 2084"),
				"'s sound wave generator function."
			),
			m('p', 'The following values are inputs for the function. b1-b7 are byte values (8 bits), u1 is a short (16 bits)'),
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
			),
			m('.credits',
				m('p', 'Adapated by ',
					m('a',
						{href: 'https://github.com/spacejack'},
						'spacejack'
					),
					' from ',
					m('a',
						{href: 'http://www.lomont.org/Software/Misc/Robotron/'},
						'this source'
					),
					'.'
				)
			)
		)
	}
}

m.mount(document.body, App)
