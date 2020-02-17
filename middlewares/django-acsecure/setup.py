from setuptools import setup, find_packages

import acsecure as app

with open('README.md', 'r') as f:
  longDescription = f.read()

setup(
  name='django-acsecure',
  version=app.__version__,
  description='Access Secure Django Middleware',
  long_description=longDescription,
  long_description_content_type='text/markdown',
  license='MIT',
  platforms=['OS Independent'],
  keywords='django, log, anti-spam',
  author='Xin Jin',
  author_email='opposcript@gmail.com',
  url='https://github.com/TrentaIcedCoffee/access-secure',
  packages=find_packages(),
  classifiers=[
    'Programming Language :: Python :: 3',
    'License :: OSI Approved :: MIT License',
    'Operating System :: OS Independent',
  ],
  install_requires=[
    'requests>=2.22.0',
  ],
  python_requires='>=3.5',
)