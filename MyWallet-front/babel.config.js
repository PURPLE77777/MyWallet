module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'babel-plugin-root-import',
				{
					paths: [
						{
							rootPathSuffix: './app/constants/',
							rootPathPrefix: '@constants/'
						},
						{
							rootPathSuffix: './app/screens/',
							rootPathPrefix: '@screens/'
						},
						{
							rootPathSuffix: './app/hooks/',
							rootPathPrefix: '@hooks/'
						},
						{
							rootPathSuffix: './app/navigation/',
							rootPathPrefix: '@navigation/'
						},
						{
							rootPathSuffix: './app/ui/',
							rootPathPrefix: '@ui/'
						},
						{
							rootPathSuffix: './app/providers/',
							rootPathPrefix: '@providers/'
						}
					]
				}
			],
			['nativewind/babel']
		]
	}
}
