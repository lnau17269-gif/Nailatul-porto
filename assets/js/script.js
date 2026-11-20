// 1. Mobile Menu Toggle
		const menuButton = document.querySelector('.menu-toggle');
		const navLinks = document.querySelector('.nav-links');
		if (menuButton && navLinks) {
			menuButton.addEventListener('click', () => {
				const isOpen = navLinks.classList.toggle('open');
				menuButton.setAttribute('aria-expanded', String(isOpen));
				menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
			});
			navLinks.querySelectorAll('a').forEach((link) => {
				link.addEventListener('click', () => {
					navLinks.classList.remove('open');
					menuButton.setAttribute('aria-expanded', 'false');
				});
			});
		}

		// 2. Accessible Tabs Navigation (Click & Keyboard Arrow Keys)
		const tabs = Array.from(document.querySelectorAll('.tabs-nav [role="tab"]'));
		const panels = Array.from(document.querySelectorAll('.tab-panel'));

		function switchTab(newTab) {
			tabs.forEach((tab) => {
				const isSelected = tab === newTab;
				tab.setAttribute('aria-selected', String(isSelected));
				tab.tabIndex = isSelected ? 0 : -1;
			});
			panels.forEach((panel) => {
				panel.hidden = panel.id !== newTab.getAttribute('aria-controls');
			});
			newTab.focus();
		}

		tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => switchTab(tab));
			tab.addEventListener('keydown', (e) => {
				if (e.key === 'ArrowRight') {
					e.preventDefault();
					const nextTab = tabs[(index + 1) % tabs.length];
					switchTab(nextTab);
				} else if (e.key === 'ArrowLeft') {
					e.preventDefault();
					const prevTab = tabs[(index - 1 + tabs.length) % tabs.length];
					switchTab(prevTab);
				}
			});
		});

		// 3. Dynamic Year in Footer
		const yearEl = document.getElementById('year');
		if (yearEl) {
			yearEl.textContent = new Date().getFullYear();
		}
