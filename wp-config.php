<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '_5)ASw7f(qA8^F7~0+*BJo?YOq({O5,4p56y5_|%8tn8p9Gx-vNgv/RFf@<6Y@{p' );
define( 'SECURE_AUTH_KEY',   'cM8/JFBf,JqY:3ksR}mPb26GausoWaB$ft>9;j#`abI#7._3_dv^:f,R&}A>3Bx-' );
define( 'LOGGED_IN_KEY',     '_@oO%[Z@z#Xh,!a|Us/SM/M<?2Ys`=T0p#G/M$-_RwO!c1fd+9ZV/Kpw=$zT;Yh ' );
define( 'NONCE_KEY',         '8NoxiXZr.^hDw:@y3OP2R6RN(bu/zy[Y)n[]VMm]C >4odN=t{M7JMqzIqmI8zx/' );
define( 'AUTH_SALT',         'WAt+;bxtMLPOJs+gX<xO>v!k~._Z=7+jTkH?,|Ol{nx*J8a)_aT *Vm4L(~oe_A{' );
define( 'SECURE_AUTH_SALT',  '#*<!7L3D+8uznSgy#3$ZIG/qk&UmumCa9`~9)+NfFd~TR3G(7kX%o)$^:#!7}j+m' );
define( 'LOGGED_IN_SALT',    '-ZF&koG$CRb6bf&bQ$l,`l|-v%9R5S`C&QhoEGP!h5OnMhH(al;PsUabm2Nr/zsX' );
define( 'NONCE_SALT',        'D3vhwox%z)9|fE ;Sqz)Qgc9<ow*^]gq|[RmRvaqCt|Ku$),iLxB=>]$|i8l8atr' );
define( 'WP_CACHE_KEY_SALT', 'MLNq1Z!Ao80QJC#4a`[4+G`(vvQ~;zMxQr(EueCu_CdJQ{J wJX9Txqf|#DrUCMe' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
