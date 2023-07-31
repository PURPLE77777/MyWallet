module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'babel-plugin-root-import',
				{
					paths: [
						// {
						// 	rootPathSuffix: './app',
						// 	rootPathPrefix: '@/'
						// },
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
