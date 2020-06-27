frappe.chat.render = (render = true, force = false) =>
{
	frappe.log.info(`${render ? "Enable" : "Disable"} Chat for User.`)

	const desk = 'desk' in frappe
	if ( desk ) {
		// With the assumption, that there's only one navbar.
		const $placeholder = $('.custom-right-sidemenu .frappe-chat-dropdown')

		// Render if frappe-chat-toggle doesn't exist.
		if ( frappe.utils.is_empty($placeholder.has('.frappe-chat-toggle')) ) {
			const $template = $(`
				<a class="dropdown-toggle frappe-chat-toggle" data-toggle="dropdown">
					<div>
						<i class="octicon octicon-comment-discussion"/>
						<span class="min-text">Messages</span>
					</div>
				</a>
			`)

			$placeholder.addClass('dropdown hidden')
			$placeholder.html($template)
		}

		if ( render ) {
			$placeholder.removeClass('hidden')
		} else {
			$placeholder.addClass('hidden')
		}
	}

	// Avoid re-renders. Once is enough.
	if ( !frappe.chatter || force ) {
		frappe.chatter = new frappe.Chat({
			target: desk ? '.frappe-chat-toggle' : null
		})

		if ( render ) {
			if ( frappe.session.user === 'Guest' && !desk ) {
				frappe.store = frappe.Store.get('frappe.chat')
				var token	 = frappe.store.get('guest_token')

				frappe.log.info(`Local Guest Token - ${token}`)

				const setup_room = (token) =>
				{
					return new Promise(resolve => {
						frappe.chat.room.create("Visitor", token).then(room => {
							frappe.log.info(`Visitor Room Created: ${room.name}`)
							frappe.chat.room.subscribe(room.name)

							var reference = room

							frappe.chat.room.history(room.name).then(messages => {
								const  room = { ...reference, messages: messages }
								return room
							}).then(room => {
								resolve(room)
							})
						})
					})
				}

				if ( !token ) {
					frappe.chat.website.token().then(token => {
						frappe.log.info(`Generated Guest Token - ${token}`)
						frappe.store.set('guest_token', token)

						setup_room(token).then(room => {
							frappe.chatter.render({ room })
						})
					})
				} else {
					setup_room(token).then(room => {
						frappe.chatter.render({ room })
					})
				}
			} else {
				frappe.chatter.render()
			}
		}
	}
}