from setuptools import setup, find_packages
from os.path import join, dirname

import acsecure as app

with open(join(dirname(__file__), 'README.md'), 'r') as f:
  longDescription = f.read()

with open(join(dirname(__file__), 'requirements.txt'), 'r') as f:
  installRequires = f.read().split('\n')

setup(
  name='django-acsecure',
  description='Access Secure Django Middleware',
  long_description=longDescription,
  long_description_content_type='text/markdown',
  license='MIT',
  platforms=['OS Independent'],
  keywords='django, log, anti-spam',
  author='Xin Jin',
  author_email='opposcript@gmail.com',
  url='https://github.com/TrentaIcedCoffee/access-secure',
  classifiers=[
    'Programming Language :: Python :: 3',
    'License :: OSI Approved :: MIT License',
    'Operating System :: OS Independent',
  ],
  python_requires='>=3.5',
  version=app.__version__,
  include_package_data=True,
  packages=find_packages(),
  install_requires=installRequires,
)