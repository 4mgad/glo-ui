module.exports = {
	title: 'Glo UI',
	serverPort: 4000,
	template: 'docs/templates/index.html',
	components: 'lib/**/[A-Z][A-Z]*.jsx',
	styleguideDir: 'docs',
	showCode: true,
	showUsage: false,
	sections: [
		{
			name: 'Introduction',
			content: 'Readme.md',
			components: 'index.jsx'
		},
		{
			name: 'Abstracts',
			content: 'lib/abstracts/index.md',
			components: 'lib/abstracts/[A-Z]*.jsx'
		},
		{
			name: 'Buttons',
			content: 'lib/buttons/index.md',
			components: 'lib/buttons/[A-Z]*.jsx'
		},
		{
			name: 'Informational',
			content: 'lib/info/index.md',
			components: 'lib/info/[A-Z]*.jsx'
		},
		{
			name: 'Inputs',
			content: 'lib/inputs/index.md',
			components: 'lib/inputs/[A-Z]*.jsx'
		},
		{
			name: 'Links',
			content: 'lib/links/index.md',
			components: 'lib/links/[A-Z]*.jsx'
		},
		{
			name: 'Lists',
			content: 'lib/lists/index.md',
			components: 'lib/lists/[A-Z]*.jsx'
		},
		{
			name: 'Selects',
			content: 'lib/selects/index.md',
			components: 'lib/selects/[A-Z]*.jsx'
		},
		{
			name: 'Page Layout',
			content: 'lib/page/index.md',
			components: 'lib/page/[A-Z]*.jsx'
		}
	],
	editorConfig: {
		theme: 'monokai',
		lineNumbers: true
	},
	theme: {
		color: {
			base: '#C3C3C3',
			light: '#C3C3C3',
			lightest: '#C3C3C3',
			link: '#C3C3C3',
			linkHover: '#FFFFFF',
			border: '#74747C',
			name: '#7f9a44',
			type: '#b77daa',
			error: '#fff',
			baseBackground: '#393743',
			errorBackground: '#870000',
			codeBackground: '#26252D',
			sidebarBackground: '#26252D'
		},
		fontSize: {
			base: 'medium',
			text: 'medium',
			small: 'small',
			h1: 'xx-large',
			h2: 'x-large',
			h3: 'large',
			h4: 'small',
			h5: 'x-small',
			h6: 'xx-small'
		}
	},
	styles: {
		Logo: {
			logo: {
				fontSize: 'xx-large'
			}
		}
	}
};
