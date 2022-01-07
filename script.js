const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
var audio = document.getElementById('audio');
var granpulse = document.getElementById('granpulse');
var knights = document.getElementById('knights');

// essentially the inventory
let state = {}

function startGame() {
	state = { morality: 0, leftNotExplored: true, rightNotExplored: true, towerNotExplored: true }
	showTextNode(1)
}

function showTextNode(textNodeIndex) {
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
	// i think somewhere here we can put the animation for the fade in text
	textElement.innerText = textNode.text
	while (optionButtonsElement.firstChild) {
		optionButtonsElement.removeChild(optionButtonsElement.firstChild)
	}

	textNode.options.forEach(option => {
		if (showOption(option)) {
			const button = document.createElement('button')
			button.innerText = option.text
			button.classList.add('btn')
			button.addEventListener('click', () => selectOption(option))
			optionButtonsElement.appendChild(button)
		}
	})
}

function showOption(option) {
	return option.requiredState == null || option.requiredState()
}

function selectOption(option) {
	const nextTextNodeId = option.nextText()
	// restarts game when pressed 'restart button' 
	if (nextTextNodeId <= 0) {
		return startGame()
	}
	// since google chrome doesnt allow autoplay I made it so the music plays after you press the first next button. Rn the audio is kinda just whatever i pulled outta my ass so feel free to suggest others
	// audio for forest & deeper into forest
	if (nextTextNodeId == 2 || nextTextNodeId == 22) {
		granpulse.pause()
		audio.play()
		audio.loop = true
	}
	// audio for cave
	if (nextTextNodeId == 20) {
		audio.pause()
		knights.pause()
		granpulse.play()
		granpulse.loop = true
	}
	// audio for tower
	if (nextTextNodeId == 76) {
		audio.pause()
		knights.play()
		knights.loop = true
	}
	state = Object.assign(state, option.setState)
	showTextNode(nextTextNodeId)
}

function rollDice(num) {
	// random int from 0 to num
	num = num + 1;
	return Math.floor(Math.random() * num);
}

const textNodes = [
	{
		id: 1,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 2 }
			},
		]
	},
	{
		id: 2,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 3 }
			}
		]
	},
	{
		id: 3,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 4 }
			}
		]
	},
	{
		id: 4,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 5 }
			}
		]
	},
	{
		id: 5,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 6 }
			}
		]
	},
	{
		id: 6,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here. \n \n Actually, you’re struggling to remember a lot of things right now.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 7 }
			}
		]
	},
	{
		id: 7,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here. \n \n Actually, you’re struggling to remember a lot of things right now. \n \n What was your name again?',
		options: [
			{
				text: 'Next',
				nextText: () => { return 8 }
			}
		]
	},
	{
		id: 8,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here. \n \n Actually, you’re struggling to remember a lot of things right now. \n \n What was your name again? \n \n Nothing comes to mind.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 9 }
			}
		]
	},
	{
		id: 9,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here. \n \n Actually, you’re struggling to remember a lot of things right now. \n \n What was your name again? \n \n Nothing comes to mind. \n \n That might end up being an issue.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 10 }
			}
		]
	},
	{
		id: 10,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here. \n \n Actually, you’re struggling to remember a lot of things right now. \n \n What was your name again? \n \n Nothing comes to mind. \n \n That might end up being an issue. \n \n Your stomach audibly growls.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 11 }
			}
		]
	},
	{
		id: 11,
		text: 'You awaken on the hard ground, twigs and rocks digging into your back. \n  \n Above you is the twinkling green of the forest canopy, early morning sunlight dotting through the leaves. \n \n You groan and sit up, rubbing your head. \n \n You look down. A light tunic, simple trousers, worn boots, a dagger strapped to your hip, pretty normal setup. \n \n You struggle to remember what you’re doing here. \n \n Actually, you’re struggling to remember a lot of things right now. \n \n What was your name again? \n \n Nothing comes to mind. \n \n That might end up being an issue. \n \n Your stomach audibly growls. \n \n The name can wait.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 12 }
			}
		]
	},
	{
		id: 12,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 13 }
			}
		]
	},
	{
		id: 13,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 14 }
			}
		]
	},
	{
		id: 14,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction. \n \n Nothing looks familiar. ',
		options: [
			{
				text: 'Next',
				nextText: () => { return 15 }
			}
		]
	},
	{
		id: 15,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction. \n \n Nothing looks familiar. \n \n To your left, you see a winding path, disappearing deeper into the woods, the trees growing thicker and the sunlight more sparse.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 16 }
			}
		]
	},
	{
		id: 16,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction. \n \n Nothing looks familiar. \n \n To your left, you see a winding path, disappearing deeper into the woods, the trees growing thicker and the sunlight more sparse. \n \n To your right, you see a tall rocky cliff face, and, at the base, a large crevice.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 17 }
			}
		]
	},
	{
		id: 17,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction. \n \n Nothing looks familiar. \n \n To your left, you see a winding path, disappearing deeper into the woods, the trees growing thicker and the sunlight more sparse. \n \n To your right, you see a tall rocky cliff face, and, at the base, a large crevice. \n \n It looks quite large, as if it goes down intriguingly far. ',
		options: [
			{
				text: 'Next',
				nextText: () => { return 18 }
			}
		]
	},
	{
		id: 18,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction. \n \n Nothing looks familiar. \n \n To your left, you see a winding path, disappearing deeper into the woods, the trees growing thicker and the sunlight more sparse. \n \n To your right, you see a tall rocky cliff face, and, at the base, a large crevice. \n \n It looks quite large, as if it goes down intriguingly far. \n \n Behind you, in the distance, you can hear the general hustle and bustle of a city. ',
		options: [
			{
				text: 'Next',
				nextText: () => { return 19 }
			}
		]
	},
	{
		id: 19,
		text: 'You tiredly get to your feet, head still throbbing from whatever blow had rendered you unconscious. \n \n You glance left, then right, trying to get some semblance of a sense of direction. \n \n Nothing looks familiar. \n \n To your left, you see a winding path, disappearing deeper into the woods, the trees growing thicker and the sunlight more sparse. \n \n To your right, you see a tall rocky cliff face, and, at the base, a large crevice. \n \n It looks quite large, as if it goes down intriguingly far. \n \n Behind you, in the distance, you can hear the general hustle and bustle of a city. \n \n After a moment of thought, you know which direction seems the best choice.',
		options: [
			{
				text: 'Cave',
				nextText: () => { return 20 }
			},
			{
				text: 'City',
				nextText: () => { return 21 }
			},
			{
				text: 'Deeper Into the Forest',
				nextText: () => { return 22 }
			}
		]
	},
	// CAVE
	{
		id: 20,
		text: 'Turning towards the cave, you start forward, straining to see inside the dark.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 23 }
			}
		]
	},
	{
		id: 23,
		text: 'Turning towards the cave, you start forward, straining to see inside the dark. \n \n It takes a moment to adjust to the low light, but at the entrance, you see it slope downwards alarmingly fast.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 24 }
			}
		]
	},
	{
		id: 24,
		text: 'Turning towards the cave, you start forward, straining to see inside the dark. \n \n It takes a moment to adjust to the low light, but at the entrance, you see it slope downwards alarmingly fast. \n \n You slowly make your way down the loose rocky slope, taking care not to slip.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 25 }
			}
		]
	},
	{
		id: 25,
		text: 'Turning towards the cave, you start forward, straining to see inside the dark. \n \n It takes a moment to adjust to the low light, but at the entrance, you see it slope downwards alarmingly fast. \n \n You slowly make your way down the loose rocky slope, taking care not to slip. \n \n A decent way down, you see the tunnel split into two directions, one left, one right.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 26 }
			}
		]
	},
	{
		id: 26,
		text: 'Turning towards the cave, you start forward, straining to see inside the dark. \n \n It takes a moment to adjust to the low light, but at the entrance, you see it slope downwards alarmingly fast. \n \n You slowly make your way down the loose rocky slope, taking care not to slip. \n \n A decent way down, you see the tunnel split into two directions, one left, one right. \n \n The left tunnel seems to be emitting a soft glow, and the right one a very faint, very chilly breeze.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 27 }
			}
		]
	},
	{
		id: 27,
		text: 'Turning towards the cave, you start forward, straining to see inside the dark. \n \n It takes a moment to adjust to the low light, but at the entrance, you see it slope downwards alarmingly fast. \n \n You slowly make your way down the loose rocky slope, taking care not to slip. \n \n A decent way down, you see the tunnel split into two directions, one left, one right. \n \n The left tunnel seems to be emitting a soft glow, and the right one a very faint, very chilly breeze. \n \n Which direction do you head in?',
		options: [
			{
				text: 'Left',
				requiredState: () => state.leftNotExplored,
				nextText: () => { return 28 }
			},
			{
				text: 'Right',
				requitedState: () => state.rightNotExplored,
				nextText: () => { return 29 }
			}
		]
	},
	// RIGHT
	{
		id: 29,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 30 }
			}
		]
	},
	{
		id: 30,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 31 }
			}
		]
	},
	{
		id: 31,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 32 }
			}
		]
	},
	{
		id: 32,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 33 }
			}
		]
	},
	{
		id: 33,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. ',
		options: [
			{
				text: 'Next',
				nextText: () => { return 34 }
			}
		]
	},
	{
		id: 34,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes?',
		options: [
			{
				text: 'Next',
				nextText: () => { return 35 }
			}
		]
	},
	{
		id: 35,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 36 }
			}
		]
	},
	{
		id: 36,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots?',
		options: [
			{
				text: 'Next',
				nextText: () => { return 37 }
			}
		]
	},
	{
		id: 37,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 38 }
			}
		]
	},
	{
		id: 38,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 39 }
			}
		]
	},
	{
		id: 39,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets. You drop the skull, scrambling back.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 40 }
			}
		]
	},
	{
		id: 40,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets. You drop the skull, scrambling back. \n \n It thuds against the stone, rolling to a stop, nudging loose something that clatters to the ground.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 41 }
			}
		]
	},
	{
		id: 41,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets. You drop the skull, scrambling back. \n \n It thuds against the stone, rolling to a stop, nudging loose something that clatters to the ground. \n \n You tentatively reach forward, and your hand falls upon a hilt of a dagger. ',
		options: [
			{
				text: 'Next',
				nextText: () => { return 42 }
			}
		]
	},
	{
		id: 42,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets. You drop the skull, scrambling back. \n \n It thuds against the stone, rolling to a stop, nudging loose something that clatters to the ground. \n \n You tentatively reach forward, and your hand falls upon a hilt of a dagger. \n \n Thoroughly unsettled, you quickly pocket the item, turning to leave.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 43 }
			}
		]
	},
	{
		id: 43,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets. You drop the skull, scrambling back. \n \n It thuds against the stone, rolling to a stop, nudging loose something that clatters to the ground. \n \n You tentatively reach forward, and your hand falls upon a hilt of a dagger. \n \n Thoroughly unsettled, you quickly pocket the item, turning to leave. \n \n As you make your hasty retreat, one hand tracing the wall, with the other, you run your hand over the rusted blade.',
		options: [
			{
				text: 'Next',
				setState: { rustedDagger: true },
				nextText: () => { return 44 }
			}
		]
	},
	{
		id: 44,
		text: 'Deciding on the breezy tunnel, you make your way down, the temperature dropping as it grows darker. \n \n The tunnel twists and turns in the pitch blackness, and you traverse hesitantly, hand tracing the wall. \n \n It is as you are thinking of turning back that you stumble over something, whatever it was clattering against stone. \n \n  In the pitch blackness, you crouch down, fumbling with blind hands to try to identify the mystery objects. \n \n A long, straight rod. A splintering cage. Scraps of fabric. \n \n A misshapen ball… with... holes? \n \n No. \n \n Divots? \n \n No. \n \n Eye sockets. You drop the skull, scrambling back. \n \n It thuds against the stone, rolling to a stop, nudging loose something that clatters to the ground. \n \n You tentatively reach forward, and your hand falls upon a hilt of a dagger. \n \n Thoroughly unsettled, you quickly pocket the item, turning to leave. \n \n As you make your hasty retreat, one hand tracing the wall, with the other, you run your hand over the rusted blade. \n \n + Rusted Dagger',
		options: [
			{
				text: 'Next',
				setState: { rightNotExplored: false },
				nextText: () => { return 45 }
			}
		]
	},
	// LEFT
	{
		id: 28,
		text: 'Turning towards the glow, you head deeper.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 46 }
			}
		]
	},
	{
		id: 46,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 47 }
			}
		]
	},
	{
		id: 47,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 48 }
			}
		]
	},
	{
		id: 48,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 49 }
			}
		]
	},
	{
		id: 49,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 50 }
			}
		]
	},
	{
		id: 50,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 51 }
			}
		]
	},
	{
		id: 51,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 52 }
			}
		]
	},
	{
		id: 52,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 53 }
			}
		]
	},
	{
		id: 53,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 54 }
			}
		]
	},
	{
		id: 54,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 55 }
			}
		]
	},
	{
		id: 55,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 56 }
			}
		]
	},
	{
		id: 56,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms. \n \n A green toadstool, shining brighter than the others. It kind of hurts your eyes.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 57 }
			}
		]
	},
	{
		id: 57,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms. \n \n A green toadstool, shining brighter than the others. It kind of hurts your eyes. \n \n A blue oyster mushroom that has a somewhat transparent appearance if you look at it hard enough.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 58 }
			}
		]
	},
	{
		id: 58,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms. \n \n A green toadstool, shining brighter than the others. It kind of hurts your eyes. \n \n A blue oyster mushroom that has a somewhat transparent appearance if you look at it hard enough. \n \n Finally, a purple chanterelle emitting a somewhat putrid smell.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 59 }
			}
		]
	},
	{
		id: 59,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms. \n \n A green toadstool, shining brighter than the others. It kind of hurts your eyes. \n \n A blue oyster mushroom that has a somewhat transparent appearance if you look at it hard enough. \n \n Finally, a purple chanterelle emitting a somewhat putrid smell. \n \n Which mushroom do you pocket first?',
		options: [
			{
				text: 'Green Toadstool',
				setState: { greenMush: true },
				nextText: () => { return 61 }
			},
			{
				text: 'Blue Oyster Mushroom',
				setState: { blueMush: true },
				nextText: () => { return 62 }
			},
			{
				text: 'Purple Chanterelle',
				setState: { purpMush: true },
				nextText: () => { return 63 }
			}
		]
	},
	{
		id: 61,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms. \n \n A green toadstool, shining brighter than the others. It kind of hurts your eyes. \n \n A blue oyster mushroom that has a somewhat transparent appearance if you look at it hard enough. \n \n Finally, a purple chanterelle emitting a somewhat putrid smell. \n \n Which mushroom do you pocket first? \n \n +Green Toadstool',
		options: [
			{
				text: 'Next',
				nextText: () => { return 60 }
			},
		]
	},
	{
		id: 62,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n Three differently pigmented mushrooms stand out to you. \n \n A green toadstool shining brighter than the others. It kind of hurts your eyes. \n \n A blue oyster mushroom that has a somewhat transparent appearance if you look at it hard enough. \n \n Finally, a purple chanterelle emitting a putrid smell. \n \n Which mushroom do you pocket first? \n \n +Blue Oyster Mushroom',
		options: [
			{
				text: 'Next',
				nextText: () => { return 60 }
			},
		]
	},
	{
		id: 63,
		text: 'Turning towards the glow, you head deeper. \n \n After a short ways, you see on the wall a small, glowing blue mushroom halfway up the wall. \n \n Further down the path, a slightly larger one resides close to the floor. \n \n As you continue the journey, the tunnel grows brighter as the mushrooms increase in frequency. \n \n After one final turn, you step into an enormous cavern, filled with luminescent flora. \n \n Giant glowing mushrooms burst from the floor, reaching almost to the cave ceiling. \n \n Bright mushroom caps populate the walls, in all sizes and colors. \n \n Hanging from the ceiling are flowering vines, phosphorescent petals occasionally drifting down. \n \n The room is so illuminated it could be mistaken for daylight. \n \n After a while of wandering the glimmering garden, you come across an assortment of colorful glowing mushrooms, low enough on the wall to reach. \n \n You see three differently pigmented mushrooms. \n \n A green toadstool, shining brighter than the others. It kind of hurts your eyes. \n \n A blue oyster mushroom that has a somewhat transparent appearance if you look at it hard enough. \n \n Finally, a purple chanterelle emitting a somewhat putrid smell. \n \n Which mushroom do you pocket first? \n \n +Purple Chanterelle',
		options: [
			{
				text: 'Next',
				nextText: () => { return 60 }
			},
		]
	},
	{
		id: 60,
		text: 'After pocketing the mushroom of your choice, the rest of the fungi shrivel and lose their luminescent glow.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 64 }
			}
		]
	},
	{
		id: 64,
		text: 'After pocketing the mushroom of your choice, the rest of the fungi shrivel and lose their luminescent glow. \n \n It’s pitch black.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 65 }
			}
		]
	},
	{
		id: 65,
		text: 'After pocketing the mushroom of your choice, the rest of the fungi shrivel and lose their luminescent glow. \n \n It’s pitch black. \n \n The cave rumbles and you scramble back down the tunnel, turning back up the slope out of the cave.',
		options: [
			{
				text: 'Next',
				setState: { leftNotExplored: false },
				nextText: () => { return 45 }
			}
		]
	},
	// cave unites
	{
		id: 45,
		text: 'Arriving back in the clearing, you’re faced once again with the city noise and the mysterious forest path.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 67 }
			}
		]
	},
	{
		id: 67,
		text: 'Arriving back in the clearing, you’re faced once again with the city noise and the mysterious forest path. \n \n Where to next?',
		options: [
			{
				text: 'City',
				nextText: () => { return 21 }
			},
			{
				text: 'Deeper Into the Forest',
				nextText: () => { return 22 }
			}
		]
	},
	// FOREST
	{
		id: 22,
		text: 'You turn down the dark forest path, making your way deeper into the woods.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 68 }
			}
		]
	},
	{
		id: 68,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 69 }
			}
		]
	},
	{
		id: 69,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance. \n \n They gradually become larger, taller, more gnarled and twisted, the branches looping and bending in a bizarre fashion.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 70 }
			}
		]
	},
	{
		id: 70,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance. \n \n They gradually become larger, taller, more gnarled and twisted, the branches looping and bending in a bizarre fashion. \n \n The light grows fainter as the canopy thickens, what few rays making it through becoming increasingly green tinted.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 71 }
			}
		]
	},
	{
		id: 71,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance. \n \n They gradually become larger, taller, more gnarled and twisted, the branches looping and bending in a bizarre fashion. \n \n The light grows fainter as the canopy thickens, what few rays making it through becoming increasingly green tinted. \n \n Up ahead, the path appears to split, and you struggle to see what lays down each path.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 72 }
			}
		]
	},
	{
		id: 72,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance. \n \n They gradually become larger, taller, more gnarled and twisted, the branches looping and bending in a bizarre fashion. \n \n The light grows fainter as the canopy thickens, what few rays making it through becoming increasingly green tinted. \n \n Up ahead, the path appears to split, and you struggle to see what lays down each path. \n \n Down one, you can just make out a tall, crooked stone tower with a vibrant purple pointed roof.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 73 }
			}
		]
	},
	{
		id: 73,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance. \n \n They gradually become larger, taller, more gnarled and twisted, the branches looping and bending in a bizarre fashion. \n \n The light grows fainter as the canopy thickens, what few rays making it through becoming increasingly green tinted. \n \n Up ahead, the path appears to split, and you struggle to see what lays down each path. \n \n Down one, you can just make out a tall, crooked stone tower with a vibrant purple pointed roof. \n \n Down the other, you think you see a cottage, smoke pouring out of the chimney.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 74 }
			}
		]
	},
	{
		id: 74,
		text: 'You turn down the dark forest path, making your way deeper into the woods. \n \n As you walk the gravel trail, weaving between trees and stepping over branches, you notice the trees changing as you advance. \n \n They gradually become larger, taller, more gnarled and twisted, the branches looping and bending in a bizarre fashion. \n \n The light grows fainter as the canopy thickens, what few rays making it through becoming increasingly green tinted. \n \n Up ahead, the path appears to split, and you struggle to see what lays down each path. \n \n Down one, you can just make out a tall, crooked stone tower with a vibrant purple pointed roof. \n \n Down the other, you think you see a cottage, smoke pouring out of the chimney. \n \n What do you explore?',
		options: [
			{
				text: 'Cottage',
				nextText: () => { return 75 }
			},
			{
				text: 'Tower',
				nextText: () => { return 76 }
			}
		]
	},
	// TOWER
	{
		id: 76,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 77 }
			}
		]
	},
	{
		id: 77,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 78 }
			}
		]
	},
	{
		id: 78,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 79 }
			}
		]
	},
	{
		id: 79,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 80 }
			}
		]
	},
	{
		id: 80,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 81 }
			}
		]
	},
	{
		id: 81,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 82 }
			}
		]
	},
	{
		id: 82,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 83 }
			}
		]
	},
	{
		id: 83,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 84 }
			}
		]
	},
	{
		id: 84,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you. \n \n In the next landing, you’re met with a study of some kind, seemingly larger than the circumference of the tower would allow.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 85 }
			}
		]
	},
	{
		id: 85,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you. \n \n In the next landing, you’re met with a study of some kind, seemingly larger than the circumference of the tower would allow. \n \n Bits and bobs clutter the shelves: banded bundles of herbs, packed leather notebooks, roiling bottles of colored smoke, flickering candles.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 86 }
			}
		]
	},
	{
		id: 86,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you. \n \n In the next landing, you’re met with a study of some kind, seemingly larger than the circumference of the tower would allow. \n \n Bits and bobs clutter the shelves: banded bundles of herbs, packed leather notebooks, roiling bottles of colored smoke, flickering candles. \n \n The floor is covered in rugs of varying colors, overlapping and forming a haphazardly plush carpet.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 87 }
			}
		]
	},
	{
		id: 87,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you. \n \n In the next landing, you’re met with a study of some kind, seemingly larger than the circumference of the tower would allow. \n \n Bits and bobs clutter the shelves: banded bundles of herbs, packed leather notebooks, roiling bottles of colored smoke, flickering candles. \n \n The floor is covered in rugs of varying colors, overlapping and forming a haphazardly plush carpet. \n \n A fireplace flickers softly against one wall, a tantalizing smell emanating from a heavy cast iron pot.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 88 }
			}
		]
	},
	{
		id: 88,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you. \n \n In the next landing, you’re met with a study of some kind, seemingly larger than the circumference of the tower would allow. \n \n Bits and bobs clutter the shelves: banded bundles of herbs, packed leather notebooks, roiling bottles of colored smoke, flickering candles. \n \n The floor is covered in rugs of varying colors, overlapping and forming a haphazardly plush carpet. \n \n A fireplace flickers softly against one wall, a tantalizing smell emanating from a heavy cast iron pot. \n \n A table off to the side glows with arcane sigils, holding glittering gems of varying sizes.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 89 }
			}
		]
	},
	{
		id: 89,
		text: 'As you approach the tower, you see that the clearing that the tower resides within seems perpetually misty, twisting silver clouds partially obscuring the base, save for the soft light of the lantern floating by the door. \n \n You make out large arched windows of stained glass, glowing softly from internal firelight. \n \n A tree grows out of one of the sides, the roots wrapping around the exterior, settling into the ivy. \n \n  As you approach, the door swings open enticingly. \n \n A chill racks your shoulders in the cool of the clearing, and after a mere moment’s hesitation, you enter. \n \n A small, cluttered entry room greets you, lit by another floating lantern. \n \n A wooden staircase winds up the sides to the next level. \n \n Advancing up the stairs, the door swings softly shut behind you. \n \n In the next landing, you’re met with a study of some kind, seemingly larger than the circumference of the tower would allow. \n \n Bits and bobs clutter the shelves: banded bundles of herbs, packed leather notebooks, roiling bottles of colored smoke, flickering candles. \n \n The floor is covered in rugs of varying colors, overlapping and forming a haphazardly plush carpet. \n \n A fireplace flickers softly against one wall, a tantalizing smell emanating from a heavy cast iron pot. \n \n A table off to the side glows with arcane sigils, holding glittering gems of varying sizes. \n \n  An alchemical stand resides off to another wall, a softly burbling potion sending off plumes of smoke, the color ever changing as it drifts around the room.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 90 }
			}
		]
	},
	{
		id: 90,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 91 }
			}
		]
	},
	{
		id: 91,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 92 }
			}
		]
	},
	{
		id: 92,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 93 }
			}
		]
	},
	{
		id: 93,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 94 }
			}
		]
	},
	{
		id: 94,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item?',
		options: [
			{
				text: 'Steal',
				nextText: () => { return 95 }
			},
			{
				text: 'Do Not Steal',
				nextText: () => { return 96 }
			}
		]
	},
	// STEAL
	{
		id: 95,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n It’s too good to pass up.',
		options: [
			{
				text: 'Next',
				nextText: () => {
					for (var i in state) {
						if (i == "morality") {
							state[i] += -1;
							break;
						}
					}
					return 97
				}
			}
		]
	},
	{
		id: 97,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n It’s too good to pass up. \n \n  You find the most expensive looking gem in the nearby vicinity, a glimmering ruby, the size of your fist.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 98 }
			}
		]
	},
	{
		id: 98,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n It’s too good to pass up. \n \n  You find the most expensive looking gem in the nearby vicinity, a glimmering ruby, the size of your fist. \n \n You pick it up, pausing for a moment to examine it in the candle light, before moving to slip it into your pocket.',
		options: [
			{
				text: 'Next',
				setState: { ruby: true },
				nextText: () => { return 99 }
			}
		]
	},
	{
		id: 99,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n It’s too good to pass up. \n \n  You find the most expensive looking gem in the nearby vicinity, a glimmering ruby, the size of your fist. \n \n You pick it up, pausing for a moment to examine it in the candle light, before moving to slip it into your pocket. \n \n As you do, your vision goes white and your lungs fill with smoke as a loud *BANG* deafens the room.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 102 }
			}
		]
	},
	// DON'T STEAL
	{
		id: 96,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n No way, you’re already intruding in someone’s workshop, there’s no way you’re gonna take their items as well.',
		options: [
			{
				text: 'Next',
				nextText: () => {
					for (var i in state) {
						if (i == "morality") {
							state[i] += 1;
							break;
						}
					}
					return 100
				}
			}
		]
	},
	{
		id: 100,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n No way, you’re already intruding in someone’s workshop, there’s no way you’re gonna take their items as well. \n \n Rather than let your eyes linger on the comically large gemstones stacked next to you, you turn your focus back to the room, looking over the complex instruments atop the tables.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 101 }
			}
		]
	},
	{
		id: 101,
		text: 'All of the gems, the glassware, the artifacts and runes dotted throughout the room make it seem almost otherworldly in nature. \n \n The objects themselves seem magical. \n \n And rather expensive. \n \n With another furtive glance around the room, you confirm that it is still empty. \n \n Would it be so bad to pocket an item? \n \n \n \n No way, you’re already intruding in someone’s workshop, there’s no way you’re gonna take their items as well. \n \n Rather than let your eyes linger on the comically large gemstones stacked next to you, you turn your focus back to the room, looking over the complex instruments atop the tables. \n \n As you consider stepping closer for a better look, your vision goes white and your lungs fill with smoke as a loud *BANG* deafens the room.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 102 }
			}
		]
	},
	{
		id: 102,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 103 }
			}
		]
	},
	{
		id: 103,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 104 }
			}
		]
	},
	{
		id: 104,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 105 }
			}
		]
	},
	{
		id: 105,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 106 }
			}
		]
	},
	{
		id: 106,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 107 }
			}
		]
	},
	{
		id: 107,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 108 }
			}
		]
	},
	{
		id: 108,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 109 }
			}
		]
	},
	{
		id: 109,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book. \n \n As he scribbles, he continues with his complete stream of nonsense.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 110 }
			}
		]
	},
	{
		id: 110,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book. \n \n As he scribbles, he continues with his complete stream of nonsense. \n \n “The smoke… not poisonous any more… four seconds to clear… minimal burns… if they were wearing thicker socks… transporting the elderly....”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 111 }
			}
		]
	},
	{
		id: 111,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book. \n \n As he scribbles, he continues with his complete stream of nonsense. \n \n “The smoke… not poisonous any more… four seconds to clear… minimal burns… if they were wearing thicker socks… transporting the elderly....” \n \n Without turning his attention from the book, he raises his staff in his other hand, twirling it in a complex motion.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 112 }
			}
		]
	},
	{
		id: 112,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book. \n \n As he scribbles, he continues with his complete stream of nonsense. \n \n “The smoke… not poisonous any more… four seconds to clear… minimal burns… if they were wearing thicker socks… transporting the elderly....” \n \n Without turning his attention from the book, he raises his staff in his other hand, twirling it in a complex motion. \n \n The room begins to tidy itself, books flying to slam onto shelves, a broom moving on its own to sweep the soot.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 113 }
			}
		]
	},
	{
		id: 113,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book. \n \n As he scribbles, he continues with his complete stream of nonsense. \n \n “The smoke… not poisonous any more… four seconds to clear… minimal burns… if they were wearing thicker socks… transporting the elderly....” \n \n Without turning his attention from the book, he raises his staff in his other hand, twirling it in a complex motion. \n \n The room begins to tidy itself, books flying to slam onto shelves, a broom moving on its own to sweep the soot. \n \n You tear your attention away from the broom, looking up just in time to see a thick tome hurtling towards your face.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 114 }
			}
		]
	},
	{
		id: 114,
		text: 'You cough, fanning the smoke away from your face, blinking back tears as your eyes begin to burn. \n \n Out of the fog, a staff suddenly juts out, flailing for a moment before smacking open a window. \n \n Within the cloud, a muttered word, and the smoke rushes out the window as if pulled. \n \n Standing in the center of the room, on a chair, is a knobbly old man, facing away. \n \n You can’t tell if his robes are supposed to be black, or if it’s the caked on soot that covers every surface in his vicinity. \n \n You wonder if you should help him put out the tiny fire atop his crooked, pointy hat. \n \n A moment passes, as if he’s waiting for something to happen, and when it doesn’t, he leaps off the chair, excitedly muttering as he runs to make note in a nearby book. \n \n As he scribbles, he continues with his complete stream of nonsense. \n \n “The smoke… not poisonous any more… four seconds to clear… minimal burns… if they were wearing thicker socks… transporting the elderly....” \n \n Without turning his attention from the book, he raises his staff in his other hand, twirling it in a complex motion. \n \n The room begins to tidy itself, books flying to slam onto shelves, a broom moving on its own to sweep the soot. \n \n You tear your attention away from the broom, looking up just in time to see a thick tome hurtling towards your face. \n \n Bracing for a broken nose, you drop as fast as you can, ragdolling to the floor and in turn sending a nearby chair clattering over.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 115 }
			}
		]
	},
	{
		id: 115,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses.',
		options: [
			{
				text: 'Next',
				nextText: () => { if (state.ruby) {
									var roll = rollDice(20); 
									if (roll < 11) {
								  		return 152 // fail sleight of hand
									}
									else {
										return 116
									}
								  }
								 
								return 116
								  
								}
								
			}
		]
	},
	{
		id: 116,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?”',
		options: [
			{
				text: '"I woke up in the forest and I don’t remember anything, the door just opened, I swear!"',
				nextText: () => { return 117 }
			},
			{
				text: '"I’m exploring the forest and I came across your tower, I didn’t mean anything bad."',
				nextText: () => { return 117 }
			},
			{
				text: '"Uhh, you did hire me! It’s my first day, you told me to come at noon…"',
				nextText: () => { return 118 }
			},
			{
				text: '"I’m here on behalf of the monarchy, you owe several hundred gold pieces in taxes."',
				nextText: () => { return 119 }
			}
		]
	},
	// OPTION A + B 
	{
		id: 117,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Interesting...A random nosy young peasant shows up claiming to have unknowingly stumbled upon this INFAMOUS wizard’s HIDDEN tower.”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 120 }
			}
		]
	},
	{
		id: 120,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Interesting...A random nosy young peasant shows up claiming to have unknowingly stumbled upon this INFAMOUS wizard’s HIDDEN tower.” \n \n He harshly stares at you.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 121 }
			}
		]
	},
	{
		id: 121,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Interesting...A random nosy young peasant shows up claiming to have unknowingly stumbled upon this INFAMOUS wizard’s HIDDEN tower.” \n \n He harshly stares at you. \n \n Sweat starts to trickle down the back of your neck.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 122 }
			}
		]
	},
	{
		id: 122,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Interesting...A random nosy young peasant shows up claiming to have unknowingly stumbled upon this INFAMOUS wizard’s HIDDEN tower.” \n \n He harshly stares at you. \n \n Sweat starts to trickle down the back of your neck. \n \n “Very well, since it seems you’ve made it here out of pure fool’s luck I have a vigorous task for you to partake in.”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 123 }
			}
		]
	},
	// OPTION C
	{
		id: 118,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Ahhhh! I see!” The wizard slaps his forehead and backs away from you.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 124 }
			}
		]
	},
	{
		id: 124,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Ahhhh! I see!” The wizard slaps his forehead and backs away from you. \n \n Forgive me, I was  working on this amnesia potion — and it seems to have worked ha Ha HA!”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 125 }
			}
		]
	},
	{
		id: 125,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Ahhhh! I see!” The wizard slaps his forehead and backs away from you. \n \n Forgive me, I was  working on this amnesia potion — and it seems to have worked ha Ha HA!” \n \n He gestures to you to venture further inside his workshop with his staff.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 126 }
			}
		]
	},
	{
		id: 126,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n “Ahhhh! I see!” The wizard slaps his forehead and backs away from you. \n \n Forgive me, I was  working on this amnesia potion — and it seems to have worked ha Ha HA!” \n \n He gestures to you to venture further inside his workshop with his staff. \n \n  “Come in, come in! I already have your first task ready to be tackled.”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 127 }
			}
		]
	},
	// OPTION D
	{
		id: 119,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n His eyes immediately widen, and he swings his staff around to level it at your neck.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 128 }
			}
		]
	},
	{
		id: 128,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n His eyes immediately widen, and he swings his staff around to level it at your neck. \n \n “Dagnabbit!! I thought I escaped those bastards at the IRS! How’d you find me?!” ',
		options: [
			{
				text: '"Woah woah, I don’t want any trouble. I was just joking, I found this place by accident."',
				nextText: () => { return 129 }
			},
			{
				text: '"Uhh, someone tipped us off! One of your old assistants! He sold you out for 3 gp!"',
				nextText: () => { return 130 }
			},
			{
				text: '"It doesn’t matter how we found you. What matters is if you have our money."',
				nextText: () => { return 130 }
			}
		]
	},
	// joking option
	{
		id: 129,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n His eyes immediately widen, and he swings his staff around to level it at your neck. \n \n “Dagnabbit!! I thought I escaped those bastards at the IRS! How’d you find me?!” \n \n \n \n He squints at you appraisingly, before slowly lowering his staff.',
		options: [
			{
				text: 'Next.',
				nextText: () => { return 132 }
			}
		]
	},
	{
		id: 132,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n His eyes immediately widen, and he swings his staff around to level it at your neck. \n \n “Dagnabbit!! I thought I escaped those bastards at the IRS! How’d you find me?!” \n \n \n \n He squints at you appraisingly, before slowly lowering his staff. \n \n  “Not very funny, are you?”',
		options: [
			{
				text: 'Next.',
				nextText: () => { return 123 }
			}
		]
	},
	// money
	{
		id: 130,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n His eyes immediately widen, and he swings his staff around to level it at your neck. \n \n “Dagnabbit!! I thought I escaped those bastards at the IRS! How’d you find me?!” \n \n \n \n A crazed glint takes over his eyes, and his staff swings around to strike the ground.',
		options: [
			{
				text: 'Next.',
				nextText: () => { return 131 }
			}
		]
	},
	{
		id: 131,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n \n \n His eyes immediately widen, and he swings his staff around to level it at your neck. \n \n “Dagnabbit!! I thought I escaped those bastards at the IRS! How’d you find me?!” \n \n \n \n A crazed glint takes over his eyes, and his staff swings around to strike the ground. \n \n As the room fills once more with smoke, the last thing you hear beyond your own hacking coughs is “You’ll have to kill me first!!”',
		options: [
			{
				text: 'Next.',
				setState: { towerNotExplored: false},
				nextText: () => { return 133 }
			}
		]
	},
	// tower fail
	{
		id: 133,
		text: 'Well that didn’t go well.',
		options: [
			{
				text: 'Next.',
				nextText: () => { return 134 }
			}
		]
	},
	{
		id: 134,
		text: 'Well that didn’t go well. \n \n You’re back to where you started. \n \n Where to next?',
		options: [
			{
				text: 'City',
				nextText: () => { return 21 }
			},
			{
				text: 'Deeper into Forest',
				nextText: () => { return 22 }
			},
			{
				text: 'Cave',
				nextText: () => { return 20 }
			}
		]
	},
	// puzzle start
	{
		id: 123,
		text: 'The wizard hauls you across the room to the chair he arrived atop.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 136 }
			},
		]
	},
	{
		id: 136,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 137 }
			},
		]
	},
	{
		id: 137,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 138 }
			},
		]
	},
	{
		id: 138,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 139 }
			},
		]
	},
	{
		id: 139,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 140 }
			},
		]
	},
	{
		id: 140,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 143 }
			}
		]
	},
	{
		id: 143,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: ',
		options: [
			{
				text: '“Abberate?”',
				nextText: () => { return 141 }
			},
			{
				text: '“Attainder?”',
				nextText: () => { return 142 }
			},
			{
				text: '"“Axiomatic?”',
				nextText: () => { return 141 }
			}
		]
	},
	// incorrect puzzle choice
	{
		id: 141,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “No no, that can’t be it. Try again!”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 140 }
			},
		]
	},
	// correct puzzle choice
	{
		id: 142,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!”',
		options: [
			{
				text:'Next', 
				nextText: () => { return 144 }
			}
		]
	},
	{
		id: 144,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 145 }
			}
		]
	},
	{
		id: 145,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands. \n \n It looks to be a crossword puzzle that only has one slot left to be solved.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 146 }
			}
		]
	},
	{
		id: 146,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands. \n \n It looks to be a crossword puzzle that only has one slot left to be solved. \n \n “At long last, my mind is no longer burdened by the constant rumination of this perplexity leaving me unable to rest for EONS!”', 
		options: [
			{
				text: 'Next',
				nextText: () => { return 147 }
			}
		]
	},
	{
		id: 147,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands. \n \n It looks to be a crossword puzzle that only has one slot left to be solved. \n \n “At long last, my mind is no longer burdened by the constant rumination of this perplexity leaving me unable to rest for EONS!” \n \n “You were having trouble sleeping...over a crossword puzzle?”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 148 }
			}
		]
	},
	{
		id: 148,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands. \n \n It looks to be a crossword puzzle that only has one slot left to be solved. \n \n “At long last, my mind is no longer burdened by the constant rumination of this perplexity leaving me unable to rest for EONS!” \n \n “You were having trouble sleeping...over a crossword puzzle?” You remark hesitantly, wondering if you should’ve just explored the cottage instead.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 149 }
			}
		]
	},
	{ 
		id: 149,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands. \n \n It looks to be a crossword puzzle that only has one slot left to be solved. \n \n “At long last, my mind is no longer burdened by the constant rumination of this perplexity leaving me unable to rest for EONS!” \n \n “You were having trouble sleeping...over a crossword puzzle?” You remark hesitantly, wondering if you should’ve just explored the cottage instead. \n \n “SHUT IT!”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 150 }
			}
		]
	},
	{
		id: 150,
		text: 'The wizard hauls you across the room to the chair he arrived atop. \n \n A strong shove on your shoulder forces you to sit, rocking the chair backwards with you on it. \n \n Before you can fall to the floor, a broom sweeps across the room, the handle knocking into the chair back and sending you upright once again. \n \n “I have been bewitched by this puzzle for too many years to count. It desires an act done by tyrants. The solution possesses as many letters as cats have lives. I have not known rest since I undertook this challenge, and I fear it will haunt me to my grave.” \n \n He clenches his fist towards the ceiling and a single tear falls from his eye. \n \n You think about the clues the wizard has given you to help solve his questionable dilemma. \n \n A word comes to mind: \n \n \n \n “Ho ho! That’s it!” \n \n The old crazy wizard snaps his fingers and a linen rag appears in his hands. \n \n It looks to be a crossword puzzle that only has one slot left to be solved. \n \n “At long last, my mind is no longer burdened by the constant rumination of this perplexity leaving me unable to rest for EONS!” \n \n “You were having trouble sleeping...over a crossword puzzle?” You remark hesitantly, wondering if you should’ve just explored the cottage instead. \n \n “SHUT IT!” The wizard bellows and the surrounding books once again fall from their respective places on the shelves.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 151 }
			}
		]
	},
	{
	// fail sleight of hand check
		id: 152,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?”',
		options: [
			{
				text: 'Next',
				nextText: () => { return 153 }
			}
		]
	},
	{ 
		id: 153,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n Before you’re able to reply, his eyes narrow, darting down to eye your slightly fuller pockets.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 154 }
			}
		]
	},
	{
		id: 154,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n Before you’re able to reply, his eyes narrow, darting down to eye your slightly fuller pockets. \n \n You have but a brief moment to think “Oh shit,” before you’re being lifted into the air and turned upside down by what feels like an unseen hand on your ankle.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 155 }
			}
		]
	},
	{
		id: 155,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n Before you’re able to reply, his eyes narrow, darting down to eye your slightly fuller pockets. \n \n You have but a brief moment to think “Oh shit,” before you’re being lifted into the air and turned upside down by what feels like an unseen hand on your ankle. \n \n It promptly begins to shake you around until the gem you had stolen slips from your pocket and into the wizard’s readied hand.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 156 }
			}
		]
	},
	{
		id: 156,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n Before you’re able to reply, his eyes narrow, darting down to eye your slightly fuller pockets. \n \n You have but a brief moment to think “Oh shit,” before you’re being lifted into the air and turned upside down by what feels like an unseen hand on your ankle. \n \n It promptly begins to shake you around until the gem you had stolen slips from your pocket and into the wizard’s readied hand. \n \n “I know a thief when I see one,” he glowers, before turning on his heel and moving to replace the gem where you had nicked it.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 157 }
			}
		]
	},
	{
		id: 157,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n Before you’re able to reply, his eyes narrow, darting down to eye your slightly fuller pockets. \n \n You have but a brief moment to think “Oh shit,” before you’re being lifted into the air and turned upside down by what feels like an unseen hand on your ankle. \n \n It promptly begins to shake you around until the gem you had stolen slips from your pocket and into the wizard’s readied hand. \n \n “I know a thief when I see one,” he glowers, before turning on his heel and moving to replace the gem where you had nicked it. \n \n “Shouldn’t have been a pyrite,” without even turning back to look at you, he strikes the ground with his staff and you’re enveloped by choking black smoke.',
		options: [
			{
				text: 'Next',
				nextText: () => { return 158 }
			}
		]
	},
	{
		id: 158,
		text: 'This draws the crazy old man’s attention, and within seconds, he’s in front of you, peering down through thick wire rimmed glasses. \n \n “I don’t remember hiring any new assistants, who’re you?” \n \n Before you’re able to reply, his eyes narrow, darting down to eye your slightly fuller pockets. \n \n You have but a brief moment to think “Oh shit,” before you’re being lifted into the air and turned upside down by what feels like an unseen hand on your ankle. \n \n It promptly begins to shake you around until the gem you had stolen slips from your pocket and into the wizard’s readied hand. \n \n “I know a thief when I see one,” he glowers, before turning on his heel and moving to replace the gem where you had nicked it. \n \n “Shouldn’t have been a pyrite,” without even turning back to look at you, he strikes the ground with his staff and you’re enveloped by choking black smoke. \n \n As you feel your gravity shifting, you hear one last frantic call of “WAIT NO! SEE YOU IN PRISM!”',
		options: [
			{
				text: 'Next',
				setState: { towerNotExplored: false},
				nextText: () => { return 159 }
			}
		]
	}





]
startGame()